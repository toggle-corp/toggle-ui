module.exports = {
    'extends': [
        'airbnb',
        'airbnb/hooks',
        'plugin:postcss-modules/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    'env': {
        'browser': true,
        'jest': true,
    },
    'plugins': [
        // 'react',
        // 'react-hooks',
        // 'import',
        'postcss-modules',
        '@typescript-eslint',
    ],
    'settings': {
        'postcss-modules': {
            'camelCase': 'camelCaseOnly',
        },
        'import/resolver': {
            'babel-module': {
                'root': ['.'],
                'extensions': ['.js', '.jsx', '.ts', '.tsx'],
                'alias': {
                    '#components': './src/components',
                },
            },
        },
        'react': {
            'version': 'detect',
        },
    },
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 2018,
        'ecmaFeatures': {
            'jsx': true,
        },
        'sourceType': 'module',
        'allowImportExportEverywhere': true,
    },
    'rules': {
        'strict': 0,
        'indent': ['error', 4, { 'SwitchCase': 1 }],
        'no-unused-vars': [1, { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false }],
        'no-console': 0,

        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'react/jsx-filename-extension': ['error', {'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
        'react/prop-types': [1, { 'ignore': [], 'customValidators': [], 'skipUndeclared': false }],
        'react/forbid-prop-types': [1],
        'react/destructuring-assignment': [1, "always", { "ignoreClassFields": true }],
        'react/sort-comp': [1, {
            order: [
                'static-methods',
                'constructor',
                'lifecycle',
                'everything-else',
                'render',
            ],
        }],

        'jsx-a11y/anchor-is-valid': [ 'error', {
            'components': [ 'Link' ],
            'specialLink': [ 'to' ],
        }],

        'import/extensions': ['off', 'never'],
        'import/no-extraneous-dependencies': ['error', {'devDependencies': true }],

        'postcss-modules/no-unused-class': 'warn',
        'postcss-modules/no-undef-class': 'warn',

        'prefer-destructuring': 'warn',
        'function-paren-newline': ['warn', 'consistent'],
        'object-curly-newline': [2, {
            'ObjectExpression': { 'consistent': true },
            'ObjectPattern': { 'consistent': true },
            'ImportDeclaration': { 'consistent': true },
            'ExportDeclaration': { 'consistent': true },
        }],

        'jsx-a11y/label-has-for': 'warn',

        '@typescript-eslint/no-empty-interface': 0,
        '@typescript-eslint/explicit-function-return-type': 0,

        'react/no-unused-state': 'warn',
        'react/jsx-props-no-spreading': 'warn',
        'react/require-default-props': 'warn',
        'react/default-props-match-prop-types': ['warn', {
            'allowRequiredDefaults': true,
        }],

        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn'
    },
};
