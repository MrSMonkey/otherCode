// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    commonjs: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaFeatures: {
      node: true,
      jsx: true,
      modules: true,
      ecmaVersion: 6
    },
    sourceType: "module"
  },
  parser: "babel-eslint",
  plugins: [
    'react'
  ],
  rules: {
    'eol-last':0,
    'spaced-comment':0,
    'linebreak-style':0,
    'comma-dangle':0,
    'no-unused-vars':0,
    'no-trailing-spaces':0,
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
