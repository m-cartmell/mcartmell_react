import js from '@eslint/js';
import nextVitals from 'eslint-config-next/core-web-vitals';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const config = [
  js.configs.recommended,
  ...nextVitals,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      'brace-style': 'error',
      'comma-dangle': ['error', 'always-multiline'],
      'func-call-spacing': ['error', 'never'],
      eqeqeq: 'warn',
      indent: 'off',
      'key-spacing': ['error', { beforeColon: false }],
      'no-console': 'off',
      'no-fallthrough': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'prefer-const': 'error',
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
      semi: ['error', 'always'],
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@next/next/no-img-element': 'off',
    },
  },
  {
    files: ['**/next.config.js', '**/optimise-images.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];

export default config;
