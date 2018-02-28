module.exports = {


    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": [
        "plugin:prettier/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "prettier"
    ],
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "prettier/prettier": "error",
        "semi": [
            "error",
            "always"
        ]
    }
};