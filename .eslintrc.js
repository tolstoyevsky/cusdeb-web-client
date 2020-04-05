module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        "plugin:react/recommended",
        "airbnb",
    ],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: "module",
    },
    plugins: [
        "react",
    ],
    rules: {
        quotes: [
            "error",
            "double",
            { "allowTemplateLiterals": true },
        ],
        indent: [
            "error",
            4,
            { SwitchCase: 1 },
        ],
        "react/jsx-indent": [
            "error",
            4,
        ],
        "import/prefer-default-export": "off",
        "react/jsx-indent-props": [
            "error",
            4
        ],
        "arrow-body-style": [
            "error",
            "as-needed",
        ],
        "react/destructuring-assignment": [
            "error",
            "always",
            {
                ignoreClassFields: true
            },
        ]
    },
    settings: {
        react: {
            pragma: "React",
            version: "16.12.0"
        },
        "import/resolver": {
            node: {
                paths: ["src"]
            }
        }
    }
};
