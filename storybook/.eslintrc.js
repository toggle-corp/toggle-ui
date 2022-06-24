const eslintrc = require('.././eslintrc.js');

module.exports = {
    ...eslintrc,
    rules: {
        ...eslintrc.rules,
        'import/no-extraneous-dependencies': 0,
        'import/no-relative-packages': 0,
        'react/function-component-definition': 0,
    },
};