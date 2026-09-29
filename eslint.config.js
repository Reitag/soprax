import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseLint from 'typescript-eslint';
import { defineConfig } from 'eslint';

export default defineConfig(
  {
    ignores: ['**/dist', '**/node_modules', '**/build'],
  },

  js.configs.recommended,
  ...tseLint.configs.recommended,

  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tseLint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    settings: {
      react: { version: 'detect' },
    },

    rules: {
      // React & JSX Runtime
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,

      // Hooks rules
      ...reactHooks.configs.recommended.rules,

      // Vite fast-refresh rule
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // TypeScript & Custom rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',

      'no-console': 'off',
      eqeqeq: ['error', 'always'],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },

  {
    files: ['*.js', '*.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node,
    },
    rules: {
      'no-console': 'off',
    },
  }
);
