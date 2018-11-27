// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    commonjs: true
  },
  // extends: 'eslint:recommended',
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
  globals:{
    "document": true,
    "localStorage": true,
    "window": true,
    'Promise': true,
  },
  plugins: [
    'react'
  ],
  rules: {
    'no-empty': 1,
    'eol-last':0,
    'no-console':0,
    'spaced-comment': 0,
    'linebreak-style':0,
    'comma-dangle':0,
    'no-unused-vars':0,
    'no-trailing-spaces':0,
    'no-mixed-spaces-and-tabs': 0,
    'no-case-declarations': 0,
    'no-irregular-whitespace': 1,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'off'
  }
}
