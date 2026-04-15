import js from '@eslint/js';
import nextVitals from 'eslint-config-next/core-web-vitals';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

const config = [
  js.configs.recommended,
  ...nextVitals,
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
      indent: ['error', 2, { SwitchCase: 1 }],
      'key-spacing': ['error', { beforeColon: false }],
      'no-console': 'off',
      'no-fallthrough': 'warn',
      'no-unused-vars': 'off',
      'prefer-const': 'error',
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
      semi: ['error', 'always'],
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];

export default config;
