import { ESLint } from 'eslint';

const config: ESLint.ConfigData = {
    root: true,
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
    },
    plugins: ['@typescript-eslint', 'vue', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-recommended',
        'plugin:prettier/recommended',
    ],
    rules: {
        'prettier/prettier': 'error',
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    },
};

export default config;
