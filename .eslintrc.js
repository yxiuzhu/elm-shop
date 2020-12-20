module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    // '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 默认需要在语句后面加上;
    'semi': ['error', 'always'],
    'indent': 'off',
    // 函数声明后面的空格
    'space-before-function-paren': 0,
    "keyword-spacing": [2, {"overrides": {
      "if": {"after": false},
      "for": {"after": false},
      "while": {"after": false}
    }}]
  }
}
