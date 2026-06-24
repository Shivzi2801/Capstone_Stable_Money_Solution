// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // RN <Text> renders strings literally; HTML-entity escaping is unnecessary noise.
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    ignores: ['dist/*'],
  },
]);
