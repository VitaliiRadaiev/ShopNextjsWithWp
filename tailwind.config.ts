import type { Config } from "tailwindcss";

const themeColorMain = '#BCA47C';
const themeColorMainLight = '#E3CA9F';
const themeColorSecond = '#0c1b31';
const themeColorThird = '#00b5d3';
const themeColorFourth = '#8C8C8C';
const themeColorFifth = '#b0b0b0';
const themeColorSixth = '#0E3C67';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      ibmPlexSans: ['var(--ibm_plex_sans)'],
      roboto: ['var(--roboto)']
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        'lg': '1.5rem'
      },
      screens: {
        'sm': '100%',
        'md': '100%',
        'lg': '1340px'
      }
    },
    extend: {
      backgroundColor: {
        primary: themeColorSecond,
        secondary: themeColorMain,
        'secondary-light': themeColorMainLight,
        third: '#0E3C67',
        'third-light': '#155592',
        info: themeColorThird
      },
      colors: {
        primary: themeColorFourth,
        'primary-light': themeColorFifth,
        secondary: themeColorMain,
        'secondary-light': themeColorMainLight,
        third: themeColorSixth,
        dark: themeColorSecond,
      },
      zIndex: {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9'
      },
      screens: {
        'only-mobile': { 'min': '0px', 'max': '767.98px' }
      },
      typography: {
        DEFAULT: {
          css: {
            color: themeColorFourth,
            'max-width': 'none',
            a: {
              color: themeColorMain,
              '&:hover': {
                color: themeColorMainLight
              }
            },
            h1: {
              color: themeColorSixth
            },
            h2: {
              color: themeColorSixth
            },
            h3: {
              color: themeColorSixth
            },
            h4: {
              color: themeColorSixth
            },
            h5: {
              color: themeColorSixth
            },
            h6: {
              color: themeColorSixth
            },
          }
        }
      },
      animation: {
        spin: 'spin 1s linear infinite'
      },
      keyframes: {
        spin: {
          '100%': { transform: 'rotate(1turn)' }
        }
      }
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};
export default config;
