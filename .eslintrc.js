module.exports = {
  extends: [
    'prettier',
    'plugin:prettier/recommended',
    'plugin:react/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'prettier',
    'no-only-tests',
    'security'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    node: true
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint'
      ],
      rules: {
        // TODO: Remove rules in future PRs
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        'react/prop-types': 'off',
        'react/no-unescaped-entities': 'off',
        'react/display-name': 'off'
      }
    }
  ],
  rules: {
    'linebreak-style': ['error', 'unix'],
    'prefer-const': 'error',
    'no-var': 'error',
    'no-process-env': "error",
    'no-console': ["error", { allow: ["warn", "error", "info"] }]
  }
};
