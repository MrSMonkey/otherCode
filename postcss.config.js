module.exports = ({ file, env }) => ({
  ident: 'postcss',
  plugins: {
    'postcss-import': {
      path: ['src/styles', 'src']
    },
    'postcss-at-rules-variables': {},
    'postcss-each': {},
    'postcss-custom-properties': {},
    'postcss-mixins': {},
    'postcss-simple-vars': {},
    'postcss-assets': {
      loadPaths: ['src/assets/imgs', 'src/assets/imgs/icons']
    },
    'postcss-px2vw':
      /node_modules/.test(file.dirname) || /\.px/.test(file.basename)
        ? false
        : {
            viewportWidth: 750, // (Number) The width of the viewport.
            viewportHeight: 1334, // (Number) The height of the viewport.
            unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
            viewportUnit: 'vw', // (String) Expected units.
            selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
            minPixelValue: 1 // (Number) Set the minimum pixel value to replace. mediaQuery: false // (Boolean) Allow px to be converted in media queries.
          },
    'postcss-nested': {},
    'postcss-flexbugs-fixes': {},
    autoprefixer: {
      browsers: [
        '> 1%',
        'iOS >=8',
        'last 2 versions',
        'not ie < 9' // React doesn't support IE8 anyway
      ],
      flexbox: 'no-2009'
    }
  }
})
