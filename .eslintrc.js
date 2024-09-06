module.exports = {
  extends: ['next', 'prettier'],
  plugins: ['unicorn'],
  rules: {
    'no-unused-vars': [
      'off',
      {
        args: 'after-used',
        caughtErrors: 'none',
        ignoreRestSiblings: true,
        vars: 'all'
      }
    ],
    'prefer-const': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'unicorn/filename-case': [
      'off',
      {
        case: 'kebabCase'
      }
    ]
  }
};
