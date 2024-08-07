import type { Config } from 'tailwindcss'
const { colorsConfig } = require('./src/themes/color.ts')
const { nextui } = require('@nextui-org/react')
import defaultTheme from 'tailwindcss/defaultTheme'
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: colorsConfig,
      keyframes: {
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          }
        }
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite'
      }
    },
    screens: {
      xs: '475px',
      llg: '1100px',
      '13inch': '1440px',
      '2xxl': '1700px',
      '3xl': '1940px',
      ...defaultTheme.screens
    }
  },
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/typography'),
    nextui({
      prefix: 'nextui', // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: 'light', // default theme from the themes object
      defaultExtendTheme: 'light', // default theme to extend on custom themes
      themes: {
        light: {
          colors: {
            bg: '#fff',
            text: '#808388',
            primary1: '#f5b500',
            selection: '#fffa65',
            section: '#DADADA',
            border: '#262b42',
            primaryYellow: '#FCB713',
            primaryBlue: '#f5b500',
            primaryText: '#1F2326',
            baseBlack: '#282828',
            primaryYellow1: '#FCB713'
          }
        },
        dark: {
          colors: {
            bg: '#2c3168',
            text: '#fff',
            primary1: '#3d8aff',
            selection: '#d835a7',
            section: '#33BBCF',
            border: '#262b42',
            primaryYellow: '#FCB713',
            primaryBlue: '#27377d',
            primaryText: '#1F2326',
            baseBlack: '#282828',
            primaryYellow1: '#FCB713'
          }
        }
      }
    }),
    addVariablesForColors
  ]
}

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]))

  addBase({
    ':root': newVars
  })
}

export default config
