// https://eslint.org/docs/user-guide/configuring

module.exports = {
  env: {
    es6: true,
    browser: true
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
  // required to lint *.vue files
  plugins: [
    'react'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
