/**
 * Date formatting utilities for consistent date display across the application
 */

/**
 * Format a date to a readable string (e.g., "Jan 15, 2024")
 */
export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return 'N/A';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return 'Invalid Date';
  
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Format a date to a short string (e.g., "01/15/2024")
 */
export function formatDateShort(date: Date | string | null | undefined): string {
  if (!date) return 'N/A';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return 'Invalid Date';
  
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

/**
 * Format a date to include time (e.g., "Jan 15, 2024 at 3:30 PM")
 */
export function formatDateTime(date: Date | string | null | undefined): string {
  if (!date) return 'N/A';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return 'Invalid Date';
  
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

/**
 * Get relative time string (e.g., "2 days ago", "in 3 weeks")
 */
export function getRelativeTime(date: Date | string | null | undefined): string {
  if (!date) return 'N/A';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return 'Invalid Date';
  
  const now = new Date();
  const diffMs = dateObj.getTime() - now.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 0 && diffDays < 7) return `In ${diffDays} days`;
  if (diffDays < 0 && diffDays > -7) return `${Math.abs(diffDays)} days ago`;
  if (diffDays > 0 && diffDays < 30) return `In ${Math.floor(diffDays / 7)} weeks`;
  if (diffDays < 0 && diffDays > -30) return `${Math.floor(Math.abs(diffDays) / 7)} weeks ago`;
  if (diffDays > 0) return `In ${Math.floor(diffDays / 30)} months`;
  return `${Math.floor(Math.abs(diffDays) / 30)} months ago`;
}

/**
 * Calculate days until a deadline
 */
export function getDaysUntil(date: Date | string | null | undefined): number {
  if (!date) return -1;
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return -1;
  
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  dateObj.setHours(0, 0, 0, 0);
  
  const diffMs = dateObj.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Check if a date is within a specified number of days
 */
export function isWithinDays(date: Date | string | null | undefined, days: number): boolean {
  const daysUntil = getDaysUntil(date);
  return daysUntil >= 0 && daysUntil <= days;
}

/**
 * Format a date range (e.g., "Jan 15 - Feb 20, 2024")
 */
export function formatDateRange(startDate: Date | string, endDate: Date | string): string {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 'Invalid Date Range';
  
  const sameYear = start.getFullYear() === end.getFullYear();
  const sameMonth = sameYear && start.getMonth() === end.getMonth();
  
  if (sameMonth) {
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { day: 'numeric', year: 'numeric' })}`;
  } else if (sameYear) {
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  } else {
    return `${formatDate(start)} - ${formatDate(end)}`;
  }
}

/**
 * Parse a date string safely
 */
export function parseDate(dateString: string | null | undefined): Date | null {
  if (!dateString) return null;
  
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
}

/**
 * Check if a deadline is urgent (within 7 days)
 */
export function isUrgentDeadline(date: Date | string | null | undefined): boolean {
  return isWithinDays(date, 7);
}

/**
 * Check if a deadline has passed
 */
export function isDeadlinePassed(date: Date | string | null | undefined): boolean {
  const daysUntil = getDaysUntil(date);
  return daysUntil < 0;
}