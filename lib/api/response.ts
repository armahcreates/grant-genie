/**
 * Standardized API Response Types
 * 
 * Ensures consistent response format across all API routes
 */

export interface ApiSuccessResponse<T> {
  data: T
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ApiErrorResponse {
  error: string
  details?: unknown
  errorId?: string
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

/**
 * Helper to create success response
 */
export function successResponse<T>(
  data: T,
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
): ApiSuccessResponse<T> {
  if (pagination) {
    return { data, pagination }
  }
  return { data }
}

/**
 * Helper to create error response
 */
export function errorResponse(
  error: string,
  status: number = 500,
  details?: unknown,
  errorId?: string
): Response {
  return Response.json(
    {
      error,
      ...(details && { details }),
      ...(errorId && { errorId }),
    } as ApiErrorResponse,
    { status }
  )
}

