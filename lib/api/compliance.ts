/**
 * Compliance API functions
 */

import { apiClient } from './client'

export interface ComplianceItem {
  id: string
  grantName: string
  requirement: string
  dueDate: Date
  status: 'Completed' | 'Upcoming' | 'Overdue'
  priority: 'High' | 'Medium' | 'Low'
}

// Fetch compliance items
export async function getComplianceItems(
  userId: string
): Promise<{ items: ComplianceItem[] }> {
  return apiClient<{ items: ComplianceItem[] }>(`/api/compliance?userId=${userId}`)
}
