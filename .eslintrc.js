module.exports = {
    "extends": [
        "airbnb-base",
        "plugin:vue/recommended"
    ],
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "jest": true,
    },
    "rules": {
        'import/prefer-default-export': 0,
        'no-new': 0,
        'no-underscore-dangle': 0,
        "vue/max-attributes-per-line": [2, {
            "singleline": 3,
            "multiline": {
                "max": 1,
                "allowFirstLine": 0
            }
        }]
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: require.resolve('@vue/cli-service/webpack.config.js')
            }
        },
    }
};