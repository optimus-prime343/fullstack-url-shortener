/**
 * @type {import("prettier").Config}
 */
module.exports = {
  semi: false,
  arrowParens: 'avoid',
  bracketSpacing: true,
  jsxSingleQuote: true,
  singleQuote: true,
  endOfLine: 'auto',
  plugins: [require('prettier-plugin-tailwindcss')],
}
