module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "next",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "react"],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "jsx-a11y/anchor-is-valid": "off",
  },
};
