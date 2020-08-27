module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "react/prop-types": 0,
        "arrow-body-style": ["error", "as-needed"],
        "object-curly-spacing": ["error", "always"],
      "no-unused-vars": "off",
        "no-empty-pattern": "off",
      "@typescript-eslint/no-unused-vars": ["off"],
        "react/display-name": "off",
        "@typescript-eslint/indent": ["error", 2],
        "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1 }],
        "@typescript-eslint/semi": ["error"],
    }
};