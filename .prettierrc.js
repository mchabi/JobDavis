/** @type {import("prettier").Config} */
const config = {
  // Basic formatting
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: "as-needed",

  // JSX formatting
  jsxSingleQuote: true,

  // Trailing commas and brackets
  trailingComma: "es5",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "avoid",

  // Whitespace and line endings
  endOfLine: "lf",

  // Parser overrides for specific file types
  overrides: [
    {
      files: "*.json",
      options: {
        trailingComma: "none",
      },
    },
    {
      files: "*.md",
      options: {
        printWidth: 100,
        proseWrap: "always",
      },
    },
    {
      files: ["*.yml", "*.yaml"],
      options: {
        tabWidth: 2,
        singleQuote: false,
      },
    },
  ],

  // Plugins
  plugins: ["prettier-plugin-tailwindcss"],
};

module.exports = config;
