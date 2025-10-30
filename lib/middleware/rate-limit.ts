/**
 * Rate Limiting Middleware
 * 
 * Protects API routes from abuse and DoS attacks
 * Uses in-memory rate limiting for development
 * Production should use Redis-based rate limiting
 */

import { NextRequest, NextResponse } from 'next/server'

// In-memory rate limit store (for development)
// Production should use Redis via @upstash/ratelimit
interface RateLimitEntry {
  count: number
  resetAt: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt < now) {
      rateLimitStore.delete(key)
    }
  }
}, 5 * 60 * 1000)

interface RateLimitOptions {
  limit?: number // Number of requests allowed
  window?: number // Time window in seconds
}

/**
 * Rate limit middleware
 * 
 * @param request - Next.js request object
 * @param options - Rate limit configuration
 * @returns Error response if rate limited, null if allowed
 */
export async function rateLimit(
  request: NextRequest,
  options: RateLimitOptions = {}
): Promise<NextResponse | null> {
  const { limit = 10, window = 10 } = options

  // Get client identifier (IP address or user ID)
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const ip = forwardedFor?.split(',')[0] || realIp || 'anonymous'
  
  // Try to get user ID from auth if available
  let identifier = ip
  try {
    const { stackServerApp } = await import('@/lib/stack')
    const user = await stackServerApp.getUser()
    if (user) {
      identifier = `user:${user.id}`
    }
  } catch {
    // Auth not available, use IP
  }

  const now = Date.now()
  const resetAt = now + window * 1000
  const entry = rateLimitStore.get(identifier)

  if (!entry || entry.resetAt < now) {
    // New entry or expired, allow request
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt,
    })
    return null
  }

  if (entry.count >= limit) {
    // Rate limit exceeded
    return NextResponse.json(
      {
        error: 'Rate limit exceeded',
        message: `Too many requests. Please try again in ${Math.ceil((entry.resetAt - now) / 1000)} seconds.`,
      },
      {
        status: 429,
        headers: {
          'Retry-After': Math.ceil((entry.resetAt - now) / 1000).toString(),
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': Math.ceil(entry.resetAt / 1000).toString(),
        },
      }
    )
  }

  // Increment counter
  entry.count++
  rateLimitStore.set(identifier, entry)

  return null
}

/**
 * Rate limit with custom limits per endpoint
 */
export function createRateLimiter(options: RateLimitOptions) {
  return (request: NextRequest) => rateLimit(request, options)
}

// Pre-configured rate limiters for common use cases
export const strictRateLimit = createRateLimiter({ limit: 5, window: 60 }) // 5 requests per minute
export const moderateRateLimit = createRateLimiter({ limit: 10, window: 10 }) // 10 requests per 10 seconds
export const lenientRateLimit = createRateLimiter({ limit: 100, window: 60 }) // 100 requests per minute

