module.exports = {
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:storybook/recommended',
  ],
  plugins: ['prettier', '@typescript-eslint', 'react-hooks', 'jsx-a11y'],
  rules: {
    'arrow-parens': ['off', 'as-needed'],
    'default-case': 'error',
    'dot-notation': 'error',
    'eol-last': 'off',
    'guard-for-in': 'error',
    'linebreak-style': 'off',
    'new-parens': 'off',
    'newline-per-chained-call': 'off',
    'no-caller': 'error',
    'no-debugger': 'error',
    'no-empty': 'error',
    'no-empty-function': 'off',
    'no-eval': 'error',
    'no-extra-semi': 'off',
    'no-fallthrough': 'error',
    'no-irregular-whitespace': 'off',
    'no-multiple-empty-lines': 'off',
    'no-new-wrappers': 'error',
    'no-param-reassign': 'error',
    'no-undef-init': 'error',
    'no-unused-labels': 'error',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
      },
    ],
    'no-var': 'error',
    'prefer-const': 'error',
    'quote-props': 'off',
    'space-before-function-paren': 'off',
    'react/jsx-no-bind': 'off',
    // Keep perf implications in mind, but was giving too many warnings and hurting readability
    'react/no-unescaped-entities': [
      'error',
      {
        forbid: ['>', '}'],
      },
    ],
    curly: 'error',
    radix: 'error',
    'react/destructuring-assignment': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['dist/**/*'],
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
