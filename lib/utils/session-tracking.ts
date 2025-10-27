/**
 * Session Tracking Utilities
 *
 * Utilities for tracking user sessions including device info, location, and activity
 */

import { db } from '@/db'
import { userSessions } from '@/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import UAParser from 'ua-parser-js'

export interface SessionInfo {
  device: string
  browser: string
  os: string
  ipAddress: string
  userAgent: string
  location?: string
}

/**
 * Parse user agent string to extract device, browser, and OS info
 */
export function parseUserAgent(userAgent: string): {
  device: string
  browser: string
  os: string
} {
  const parser = new UAParser(userAgent)
  const result = parser.getResult()

  const device = result.device.model || result.device.type || 'Unknown Device'
  const browser = result.browser.name || 'Unknown Browser'
  const os = result.os.name || 'Unknown OS'

  return { device, browser, os }
}

/**
 * Get approximate location from IP address (simplified version)
 * In production, use a proper geolocation service like ipapi.co or MaxMind
 */
export async function getLocationFromIP(ipAddress: string): Promise<string> {
  // For localhost/development
  if (ipAddress === '127.0.0.1' || ipAddress === '::1' || ipAddress?.startsWith('192.168')) {
    return 'Local Development'
  }

  try {
    // Free IP geolocation API (rate limited)
    const response = await fetch(`https://ipapi.co/${ipAddress}/json/`, {
      headers: { 'User-Agent': 'Headspace Genie Session Tracker' },
    })

    if (response.ok) {
      const data = await response.json()
      if (data.city && data.region) {
        return `${data.city}, ${data.region}`
      }
      if (data.country_name) {
        return data.country_name
      }
    }
  } catch (error) {
    console.error('Failed to get location from IP:', error)
  }

  return 'Unknown Location'
}

/**
 * Extract IP address from request headers
 */
export function getIPAddress(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const cfConnectingIp = request.headers.get('cf-connecting-ip') // Cloudflare

  return (
    cfConnectingIp ||
    realIp ||
    (forwarded ? forwarded.split(',')[0].trim() : null) ||
    '127.0.0.1'
  )
}

/**
 * Create a new session record
 */
export async function createSession(
  userId: string,
  sessionToken: string,
  sessionInfo: SessionInfo
): Promise<void> {
  try {
    // Mark all other sessions as not current
    await db
      .update(userSessions)
      .set({ isCurrent: false })
      .where(eq(userSessions.userId, userId))

    // Get location if not provided
    let location = sessionInfo.location
    if (!location) {
      location = await getLocationFromIP(sessionInfo.ipAddress)
    }

    // Create new session
    await db.insert(userSessions).values({
      userId,
      sessionToken,
      device: sessionInfo.device,
      browser: sessionInfo.browser,
      os: sessionInfo.os,
      location,
      ipAddress: sessionInfo.ipAddress,
      userAgent: sessionInfo.userAgent,
      isCurrent: true,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    })
  } catch (error) {
    console.error('Failed to create session:', error)
    throw error
  }
}

/**
 * Update session last active timestamp
 */
export async function updateSessionActivity(
  sessionToken: string
): Promise<void> {
  try {
    await db
      .update(userSessions)
      .set({
        lastActive: new Date(),
        isCurrent: true,
      })
      .where(eq(userSessions.sessionToken, sessionToken))
  } catch (error) {
    console.error('Failed to update session activity:', error)
  }
}

/**
 * Get all active sessions for a user
 */
export async function getUserSessions(userId: string) {
  try {
    const sessions = await db
      .select()
      .from(userSessions)
      .where(eq(userSessions.userId, userId))
      .orderBy(desc(userSessions.lastActive))

    return sessions
  } catch (error) {
    console.error('Failed to get user sessions:', error)
    return []
  }
}

/**
 * Delete a specific session
 */
export async function deleteSession(sessionId: number, userId: string): Promise<void> {
  try {
    await db
      .delete(userSessions)
      .where(
        and(
          eq(userSessions.id, sessionId),
          eq(userSessions.userId, userId)
        )
      )
  } catch (error) {
    console.error('Failed to delete session:', error)
    throw error
  }
}

/**
 * Delete all sessions except the current one
 */
export async function deleteOtherSessions(
  userId: string,
  currentSessionToken: string
): Promise<void> {
  try {
    await db
      .delete(userSessions)
      .where(
        and(
          eq(userSessions.userId, userId),
          // SQL: session_token != currentSessionToken
        )
      )
  } catch (error) {
    console.error('Failed to delete other sessions:', error)
    throw error
  }
}

/**
 * Clean up expired sessions
 */
export async function cleanupExpiredSessions(): Promise<void> {
  try {
    const now = new Date()
    // Delete sessions that haven't been active in 30 days
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    await db
      .delete(userSessions)
      .where(
        and(
          // lastActive < thirtyDaysAgo
        )
      )
  } catch (error) {
    console.error('Failed to cleanup expired sessions:', error)
  }
}
