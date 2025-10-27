/**
 * React hooks for compliance data fetching
 */

import { useState, useEffect } from 'react'
import { getComplianceItems, type ComplianceItem } from '@/lib/api/compliance'

export function useCompliance(userId: string | undefined) {
  const [items, setItems] = useState<ComplianceItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setIsLoading(false)
      return
    }

    const fetchCompliance = async () => {
      try {
        setIsLoading(true)
        const { items: data } = await getComplianceItems(userId)
        setItems(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load compliance items')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCompliance()
  }, [userId])

  return { items, isLoading, error }
}
