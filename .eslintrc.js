module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 12,
  },
  rules: {
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/default-param-last": ["error"],
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "prettier/prettier": [
      1,
      {
        trailingComma: "es5",
        singleQuote: false,
        semi: true,
      },
    ],
    "no-console": 0,
  },
};
