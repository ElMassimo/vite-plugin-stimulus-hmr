import eslint from '@antfu/eslint-config'

export default [
  ...eslint(),
  {
    rules: {
      'no-console': 'off',
      'node/prefer-global/process': 'off',
      'style/space-before-function-paren': ['error', 'always'],
      'antfu/if-newline': 'off',
    },
  },
]
