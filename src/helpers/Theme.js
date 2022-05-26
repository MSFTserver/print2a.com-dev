import { darken, lighten } from 'polished'

const accent = 0.2
const generateColor = (color) => ({
  base: color,
  light: lighten(accent, color),
  dark: darken(accent, color),
})
const generateBackground = (color) => ({
  level0: color,
  level1: lighten(0.015, color),
  level2: lighten(0.03, color),
  level3: lighten(0.045, color),
})

export default {
  margin: 20,
  padding: 20,

  // Base box or text shadow length.
  shadowLength: 4,

  // Base animation duration in ms.
  animTime: 600,

  // The opacity to apply to elements when needed.
  alpha: 0.65,

  // The color variation.
  accent,

  // Every color has a `base`, `light` and `dark` variation.
  color: {
    primary: generateColor('#2a9d00'),
    secondary: generateColor('#29a86d'),
    header: generateColor('#18d736'),
    control: generateColor('#18d736'),
    success: generateColor('#00ff00'),
    alert: generateColor('#ff0000'),
    disabled: generateColor('#808080'),
  },

  // Every background color has level colors from 0 until 3
  // as `level0`, `level1`...
  background: {
    primary: generateBackground('#000000'),
    secondary: generateBackground('#180f02'),
    header: generateBackground('#032026'),
    control: generateBackground('#000000'),
    success: generateBackground('#081402'),
    alert: generateBackground('#140202'),
    disabled: generateBackground('#7f0000'),
  },

  typography: {
    lineHeight: 1.5,
    headerSizes: {
      h1: 28,
      h2: 24,
      h3: 21,
      h4: 18,
      h5: 16,
      h6: 16,
    },
    fontSize: 21,
    headerFontFamily: '"Orbitron", "sans-serif"',
    fontFamily: '"Orbitron", "sans-serif"',
  },

  code: {
    fontSize: 14,
    fontFamily:
      'Monaco, "Bitstream Vera Sans Mono", "Lucida Console", Terminal, monospace',
    background: '#000000',
    color: '#3aafff',
    comment: '#4a5f78',
    keyword: '#bB7Dbf',
    operator: '#0075e8',
    function: '#8b6ccf',
    variable: '#3aafff',
    selector: '#3aafff',
    value: '#05d48e',
  },

  // Number of columns inside a row
  columns: 12,

  // Until the number in device screen width the breakpoint is taken.
  // E.g. Until the `small` number is viewport small, from `small + 1` is medium.
  // After `large` one it is `xlarge`.
  responsive: {
    small: 600,
    medium: 992,
    large: 1200,
  },
}
