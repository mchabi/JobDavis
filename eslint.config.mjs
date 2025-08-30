import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import process from "node:process";

export default [
  // Global ignores
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "node_modules/**",
      ".env*",
      "*.config.js",
      "*.config.mjs",
      "*.config.ts",
      "setup.js",
      "commitlint.config.js",
      ".prettierrc.js",
    ],
  },

  // Base configurations
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  // General settings for all files
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        projectService: true,
        tsconfigRootDir: process.cwd(),
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // Turn off React import requirement for Next.js
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // Strict Variable Rules for Performance
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
      "prefer-const": "error",
      "no-var": "error",
      "no-unused-expressions": "error",

      // Performance & Memory Optimization
      "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
      "no-alert": "error",
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      "no-script-url": "error",

      // TypeScript Strict Rules
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/prefer-readonly": "error",
      "@typescript-eslint/prefer-readonly-parameter-types": "off", // Too strict for most cases
      "@typescript-eslint/strict-boolean-expressions": "error",

      // React Performance Rules
      "react/jsx-key": "error",
      "react/jsx-no-bind": [
        "error",
        {
          allowArrowFunctions: false,
          allowBind: false,
          allowFunctions: false,
        },
      ],
      "react/jsx-no-constructed-context-values": "error",
      "react/jsx-no-useless-fragment": "error",
      "react/no-array-index-key": "warn",
      "react/no-unstable-nested-components": "error",
      "react/self-closing-comp": "error",

      // Code Quality & Readability
      complexity: ["error", { max: 10 }],
      "max-depth": ["error", { max: 4 }],
      "max-lines-per-function": [
        "error",
        { max: 100, skipBlankLines: true, skipComments: true },
      ],
      "max-params": ["error", { max: 4 }],
      "no-duplicate-imports": "error",
      "no-useless-return": "error",
      "no-useless-concat": "error",
      "no-useless-rename": "error",
      "object-shorthand": "error",
      "prefer-template": "error",
      "prefer-arrow-callback": "error",
      "arrow-body-style": ["error", "as-needed"],

      // Import/Export Optimization
      "sort-imports": [
        "error",
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        },
      ],

      // Async/Promise Best Practices
      "no-async-promise-executor": "error",
      "no-await-in-loop": "error",
      "no-promise-executor-return": "error",
      "prefer-promise-reject-errors": "error",

      // Error Prevention
      "no-unreachable": "error",
      "no-unreachable-loop": "error",
      "no-constant-condition": "error",
      "no-dupe-keys": "error",
      "no-duplicate-case": "error",
      "no-empty": "error",
      "no-extra-boolean-cast": "error",
      "no-sparse-arrays": "error",
      "valid-typeof": "error",
    },
  },

  // Node.js configuration files
  {
    files: [
      "*.config.{js,mjs,ts}",
      "setup.js",
      "commitlint.config.js",
      ".prettierrc.js",
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },

  // TypeScript declaration files
  {
    files: ["*.d.ts"],
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
];
