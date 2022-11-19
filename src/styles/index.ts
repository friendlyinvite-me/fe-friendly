import { createStitches } from '@stitches/react';

export type Typography = 'h1' | 'h2' | 'h3' | 'h4' | 'p';

export const { styled, css } = createStitches({
  theme: {
    colors: {
      gray500: 'hsl(206,10%,76%)',
      blue500: 'hsl(206,100%,50%)',
      purple500: 'hsl(252,78%,60%)',
      green500: 'hsl(148,60%,60%)',
      red500: 'hsl(352,100%,62%)',
      yellow500: 'yellow',

      appBackground: "black",

      contentPrimary: 'black'
    },
    space: {
      1: '5px',
      2: '10px',
      3: '15px',
      4: '20px',
      5: '25px',
      6: '30px',
      7: '35px',
      8: '40px',
      9: '45px',
      10: '50px'
    },
    fontSizes: {
      1: '12px',
      2: '13px',
      3: '15px',
    },
    fonts: {
      untitled: 'Untitled Sans, apple-system, sans-serif',
      mono: 'Söhne Mono, menlo, monospace',
    },
    fontWeights: {},
    lineHeights: {},
    letterSpacings: {},
    sizes: {},
    borderWidths: {},
    borderStyles: {},
    radii: {},
    shadows: {},
    zIndices: {},
    transitions: {},
  },

  utils: {
    typography: (value: Typography) => {
      switch (value) {
        case 'h1':
        default:
          return {
            fontSize: '30px',
            lineHeight: '20px',
            fontWeight: '700',
          }

        case 'h2':
          return {
            fontSize: '27px',
            lineHeight: '15px',
            fontWeight: '600',
          }

        case 'h3':
          return {
            fontSize: '25px',
            lineHeight: '15px',
            fontWeight: '600',
          }

        case 'h4':
          return {
            fontSize: '16px',
            lineHeight: '15px',
            fontWeight: '500',
          }


        case 'p':
          return {
            fontSize: '14px',
            lineHeight: '15px',
            fontWeight: '400',
          }

      }
    }
  }
});