/**
 * Spacing Constants
 * 
 * Standardized spacing scale for consistent UI rhythm
 * Based on 4px base unit system
 */

export const spacing = {
  // Tight spacing (8px) - for related items
  tight: 2,
  
  // Normal spacing (16px) - default for most layouts
  normal: 4,
  
  // Relaxed spacing (24px) - for sections
  relaxed: 6,
  
  // Loose spacing (32px) - for major sections
  loose: 8,
  
  // Extra loose (48px) - for page-level sections
  extraLoose: 12,
} as const

/**
 * Padding Constants
 * Based on component hierarchy
 */
export const padding = {
  // Compact components (buttons, badges)
  compact: { base: 3, md: 4 },
  
  // Standard cards/content
  standard: { base: 4, md: 5 },
  
  // Elevated/premium cards
  elevated: { base: 5, md: 6 },
  
  // Page containers
  page: { base: 8, md: 12 },
  
  // Section containers
  section: { base: 6, md: 8 },
} as const

/**
 * Gap Constants
 * For VStack, HStack, SimpleGrid
 */
export const gaps = {
  // Tight gaps (related items)
  tight: 2,
  
  // Normal gaps (default)
  normal: 4,
  
  // Relaxed gaps (section spacing)
  relaxed: 6,
  
  // Loose gaps (major sections)
  loose: 8,
} as const

export type SpacingKey = keyof typeof spacing
export type PaddingKey = keyof typeof padding
export type GapKey = keyof typeof gaps

