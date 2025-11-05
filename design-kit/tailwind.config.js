/**
 * Tailwind configuration mirroring Foqus FE design tokens.
 * - Dark mode by class
 * - Custom colors for fills, text, viz
 * - Spacing scale (xs..xl)
 * - Border radius via tokens and custom pixel radii
 */
module.exports = {
  darkMode: ['class'],
  content: ['../**/*.{js,jsx,ts,tsx,mdx,html}'],
  theme: {
    extend: {
      colors: {
        // Base tokens (light mode)
        background: '#ffffff',
        foreground: '#1c1c2d',
        card: '#ffffff',
        'card-foreground': '#1c1c2d',
        primary: '#5551f7',
        'primary-foreground': '#ffffff',
        secondary: '#f5f7ff',
        destructive: '#eb491f',
        border: '#f1f1f1',
        input: '#ced7de',
        ring: '#5551f7',

        // Fill colors
        'fill-base-n1': '#f8f8f8',
        'fill-base-0': '#ffffff',
        'fill-base-1': '#f5f7ff',
        'fill-base-2': '#eaf4ff',
        'fill-base-3': '#eaf1fc',
        'fill-base-4': '#dce5f2',
        'fill-base-5': '#ced7de',

        'fill-brand-primary': '#5551f7',
        'fill-brand-primary-transparent': 'rgba(84, 82, 247, 0.2)',
        'fill-brand-secondary': '#8b9ff8',

        'fill-specific-tooltip': 'rgba(28, 28, 30, 0.9)',
        'fill-specific-background': '#eaf1fc',
        'fill-specific-divider': '#dce5f2',
        'fill-specific-sidebar-primary': '#303045',
        'fill-specific-sidebar-child': '#1c1c2d',
        'fill-specific-icon-default': '#7a7f86',
        'fill-specific-icon-hover': '#f8f8f8',
        'fill-specific-icon-onpress': '#f1f1f1',

        'fill-information-error': '#eb491f',
        'fill-information-warning': '#fbbc09',
        'fill-information-success': '#0dc783',
        'fill-information-info': '#154dab',

        // Text colors
        'text-base-primary': '#303045',
        'text-base-secondary': '#7a7f86',
        'text-base-tertiary': '#a9b4bc',
        'text-base-invert': '#ffffff',
        'text-brand-primary': '#5551f7',
        'text-brand-secondary': '#8b9ff8',
        'text-specific-sidebar-idle': '#a9b4bc',
        'text-specific-sidebar-hover': '#ced7de',
        'text-specific-sidebar-active': '#ffffff',
        'text-information-error': '#eb491f',
        'text-information-success': '#0dc783',
        'text-information-info': '#154dab',

        // Visualization colors
        'viz-event-attritional': '#8a8da9',
        'viz-event-databreach': '#ff9900',
        'viz-event-interruption': '#0dc783',
        'viz-event-ransomware': '#de5b58',

        'viz-impact-ransomware': '#154dab',
        'viz-impact-interruption': '#5551f7',
        'viz-impact-provider': '#bbbafc',
        'viz-impact-liability': '#9f3c00',
        'viz-impact-databreach': '#ff802e',
        'viz-impact-regulation': '#fcd4a4',

        'viz-impact-tags-severe': '#eb491f',
        'viz-impact-tags-significant': '#ff802e',
        'viz-impact-tags-moderate': '#fbbc09',
        'viz-impact-tags-minor': '#7cd011',
        'viz-impact-tags-negligible': '#0dc783',

        'viz-likelihood-tags-expected': '#eb491f',
        'viz-likelihood-tags-likely': '#ff802e',
        'viz-likelihood-tags-possible': '#fbbc09',
        'viz-likelihood-tags-unlikely': '#7cd011',
        'viz-likelihood-tags-rare': '#0dc783',

        'viz-priority-tags-low': '#7cd011',
        'viz-priority-tags-medium': '#fbbc09',
        'viz-priority-tags-high': '#ff802e',
        'viz-priority-tags-critical': '#eb491f',
      },
      spacing: {
        xs: '10px',
        sm: '20px',
        md: '32px',
        lg: '48px',
        xl: '64px',
      },
      borderRadius: {
        sm: 'calc(var(--radius, 0.5rem) - 4px)',
        md: 'calc(var(--radius, 0.5rem) - 2px)',
        lg: 'var(--radius, 0.5rem)',
        // Explicit pixel radii frequently used in the project
        '10': '10px',
        '15': '15px',
        '20': '20px',
      },
      fontWeight: {
        400: '400',
        600: '600',
        700: '700',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};


