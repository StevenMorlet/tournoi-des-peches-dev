import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
   baseDirectory: import.meta.dirname,
});

export default [
   ...compat.config({
      extends: [
         'eslint:recommended',
         'plugin:react/recommended',
         'plugin:@typescript-eslint/recommended',
         'plugin:prettier/recommended',
         'next',
         'next/core-web-vitals',
      ],
      plugins: ['prettier'],
      rules: {
         'prettier/prettier': 'error',
         'semi': ['error', 'never'],
         'quotes': ['error', 'single'],
      },
   }),
];