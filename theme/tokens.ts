/**
 * HeadspaceGenie.ai Design System Tokens
 * 
 * Centralized design tokens for consistent theming across the application.
 * Based on UI/UX Audit Report recommendations (Phase 2).
 */

// ============================================================================
// COLOR TOKENS
// ============================================================================

/**
 * Primary brand colors - mapped from landing page to unified palette
 */
export const colors = {
  // Brand Identity Colors (from landing page)
  brand: {
    deepIndigo: '#3C3B6E',      // Primary brand color
    softTeal: '#5CE1E6',        // Secondary accent color
    tealVariant: '#4BC5CC',     // Teal variation for gradients
    indigoVariant: '#2D2C5A',   // Indigo variation for gradients
    indigoDark: '#1a1a3e',      // Dark indigo for backgrounds
  },
  
  // Purple Palette (mapped to Chakra purple for app consistency)
  purple: {
    50: '#F8F9FF',
    100: '#E9EAFF',
    200: '#D4D6FF',
    300: '#BFBFFF',
    400: '#A9A7FF',
    500: '#9490FF',
    600: '#7E79E8',
    700: '#6862D1',
    800: '#524CBA',
    900: '#3C3B6E',  // Maps to brand.deepIndigo
  },
  
  // Functional Colors
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  
  // Grayscale
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
} as const
// ============================================================================
// DARK MODE COLOR TOKENS
// ============================================================================

/**
 * Dark mode color palette
 * Provides accessible dark theme colors following WCAG guidelines
 */
export const darkColors = {
  // Dark mode backgrounds
  background: {
    primary: '#0F1419',      // Main dark background
    secondary: '#1A1F2E',    // Card/elevated surfaces
    tertiary: '#252D3D',     // Hover states and inputs
  },
  
  // Dark mode text colors
  text: {
    primary: '#E8EAED',      // Primary text (high contrast)
    secondary: '#B8BCC4',    // Secondary text
    tertiary: '#8B92A0',     // Muted/disabled text
  },
  
  // Dark mode brand colors (adjusted for dark backgrounds)
  brand: {
    deepIndigo: '#5D5B9E',   // Lighter indigo for dark mode
    softTeal: '#6EF1F6',     // Brighter teal for dark mode
    tealVariant: '#5BD5DB',  // Teal variation
    indigoVariant: '#4D4B7A',// Indigo variation
  },
  
  // Dark mode borders and dividers
  border: {
    primary: '#2A2F3D',      // Subtle borders
    secondary: '#363D4F',    // More prominent borders
    accent: '#4A5162',       // Accent borders
  },
} as const


// ============================================================================
// TYPOGRAPHY TOKENS
// ============================================================================

/**
 * Typography scale for consistent text sizing
 * Following 4px base unit system
 */
export const typography = {
  // Heading Sizes (h1-h4)
  headings: {
    h1: {
      fontSize: { base: '2xl', sm: '3xl', md: '4xl' },  // 24px / 30px / 36px
      lineHeight: '1.1',
      letterSpacing: '-0.02em',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: { base: 'xl', md: '2xl', lg: '3xl' },   // 20px / 24px / 30px
      lineHeight: '1.2',
      letterSpacing: '-0.02em',
      fontWeight: 'bold',
    },
    h3: {
      fontSize: { base: 'lg', md: 'xl' },               // 18px / 20px
      lineHeight: '1.3',
      letterSpacing: '-0.01em',
      fontWeight: 'semibold',
    },
    h4: {
      fontSize: { base: 'md', md: 'lg' },               // 16px / 18px
      lineHeight: '1.4',
      fontWeight: 'semibold',
    },
  },
  
  // Body Text Sizes
  body: {
    large: {
      fontSize: { base: 'md', md: 'lg', lg: 'xl' },     // 16px / 18px / 20px
      lineHeight: 'tall',
      fontWeight: 'normal',
    },
    medium: {
      fontSize: { base: 'sm', md: 'md' },               // 14px / 16px
      lineHeight: '1.5',
      fontWeight: 'normal',
    },
    small: {
      fontSize: { base: 'xs', md: 'sm' },               // 12px / 14px
      lineHeight: '1.4',
      fontWeight: 'normal',
    },
  },
} as const

// ============================================================================
// SPACING TOKENS
// ============================================================================

/**
 * Spacing scale based on 4px base unit
 * Usage: spacing[2] = 8px, spacing[4] = 16px
 */
export const spacing = {
  0: '0',
  1: '4px',    // 4px
  2: '8px',    // 8px
  3: '12px',   // 12px
  4: '16px',   // 16px
  5: '20px',   // 20px
  6: '24px',   // 24px
  8: '32px',   // 32px
  10: '40px',  // 40px
  12: '48px',  // 48px
  16: '64px',  // 64px
  20: '80px',  // 80px
  24: '96px',  // 96px
} as const

// ============================================================================
// BUTTON TOKENS
// ============================================================================

/**
 * Button size guidelines for consistent hierarchy
 */
export const buttons = {
  sizes: {
    // Primary actions - large, prominent
    primary: {
      size: 'lg',
      px: { base: 8, md: 10 },
      py: { base: 6, md: 8 },
      fontSize: { base: 'md', md: 'lg' },
    },
    
    // Secondary actions - medium, balanced
    secondary: {
      size: 'md',
      px: { base: 6, md: 8 },
      py: { base: 4, md: 5 },
      fontSize: { base: 'sm', md: 'md' },
    },
    
    // Tertiary/icon actions - small, subtle
    tertiary: {
      size: 'sm',
      px: { base: 4, md: 5 },
      py: { base: 2, md: 3 },
      fontSize: 'sm',
    },
  },
  
  // Gradient styles for brand buttons
  gradients: {
    teal: {
      bgGradient: 'linear(to-r, #5CE1E6, #4BC5CC)',
      hoverBgGradient: 'linear(to-r, #4BC5CC, #5CE1E6)',
      color: 'white',
    },
    indigo: {
      bgGradient: 'linear(135deg, #3C3B6E, #2D2C5A)',
      hoverBgGradient: 'linear(135deg, #2D2C5A, #3C3B6E)',
      color: 'white',
    },
    brand: {
      bgGradient: 'linear(to-r, #5CE1E6, #3C3B6E)',
      hoverBgGradient: 'linear(to-r, #3C3B6E, #5CE1E6)',
      color: 'white',
    },
  },
} as const

// ============================================================================
// COMPONENT TOKENS
// ============================================================================

/**
 * Reusable component patterns
 */
export const components = {
  // Card styles
  card: {
    borderRadius: '2xl',
    boxShadow: 'lg',
    border: '1px solid',
    borderColor: 'purple.100',
    bg: 'white',
  },
  
  // Badge styles
  badge: {
    borderRadius: 'full',
    px: 3,
    py: 1,
    fontSize: 'sm',
    fontWeight: 'semibold',
  },
  
  // Icon container
  iconContainer: {
    borderRadius: 'xl',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
} as const

// ============================================================================
// ANIMATION TOKENS
// ============================================================================

/**
 * Animation and transition tokens
 */
export const animations = {
  transitions: {
    fast: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    normal: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  transforms: {
    hover: {
      translateY: 'translateY(-4px)',
      scale: 'scale(1.02)',
    },
    active: {
      translateY: 'translateY(-2px)',
      scale: 'scale(0.98)',
    },
  },
} as const

// ============================================================================
// SHADOW TOKENS
// ============================================================================

/**
 * Box shadow tokens for depth and elevation
 */
export const shadows = {
  brand: {
    teal: {
      sm: '0 4px 15px rgba(92, 225, 230, 0.3)',
      md: '0 10px 25px rgba(92, 225, 230, 0.4)',
      lg: '0 20px 40px rgba(92, 225, 230, 0.5)',
    },
    indigo: {
      sm: '0 4px 15px rgba(60, 59, 110, 0.3)',
      md: '0 10px 25px rgba(60, 59, 110, 0.4)',
      lg: '0 20px 40px rgba(60, 59, 110, 0.5)',
    },
  },
  elevation: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.1)',
    md: '0 4px 15px rgba(0, 0, 0, 0.15)',
    lg: '0 8px 25px rgba(0, 0, 0, 0.2)',
    xl: '0 20px 40px rgba(0, 0, 0, 0.25)',
  },
} as const

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get gradient background for buttons/containers
 */
export const getGradient = (direction: 'to-r' | 'to-br' | '135deg', color1: string, color2: string) => {
  return `linear(${direction}, ${color1}, ${color2})`
}

/**
 * Get brand color with opacity
 */
export const getBrandColorWithOpacity = (color: keyof typeof colors.brand, opacity: number) => {
  const hexColor = colors.brand[color]
  return `${hexColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`
}

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type BrandColor = keyof typeof colors.brand
export type PurpleShade = keyof typeof colors.purple
export type StatusColor = keyof typeof colors.status
export type GrayShade = keyof typeof colors.gray
export type HeadingLevel = keyof typeof typography.headings
export type BodySize = keyof typeof typography.body
export type ButtonSize = keyof typeof buttons.sizes