module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "jest": true
    },
    "rules": {
        "linebreak-style": 0,
        "react/no-did-mount-set-state": 0,
        "react/no-unescaped-entities": 0,
        "comma-dangle": [
            "error",
            "never"
        ],
        "no-param-reassign": 0,
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
    }
};