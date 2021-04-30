module.exports = (api) => {
    api.cache(false);
    return {
        /*
        'env': {
            'test': {
                'plugins': [
                    require.resolve('babel-plugin-dynamic-import-node'),
                ],
            },
        },
        */
        'presets': [
            require.resolve(
                '@babel/preset-env',
                {
                    'loose': true,
                    'useBuiltIns': false,
                    // 'useBuiltIns': 'usage',
                    // 'corejs': 3,
                    // 'debug': true,
                }
            ),
            require.resolve('@babel/preset-react'),
            require.resolve('@babel/preset-typescript'),
        ],

        'plugins': [
            // Reuse babel's injected headers
            require.resolve('@babel/plugin-transform-runtime'),
            [require('babel-plugin-polyfill-corejs3'), {
                "method": "usage-pure",
                // "targets": { "firefox": 42 }
            }],

            require.resolve('@babel/plugin-proposal-do-expressions'),
            require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
            require.resolve('@babel/plugin-proposal-optional-chaining'),

            // Stage 2
            [require.resolve('@babel/plugin-proposal-decorators'), { 'legacy': true }],
            require.resolve('@babel/plugin-proposal-function-sent'),
            require.resolve('@babel/plugin-proposal-export-namespace-from'),
            require.resolve('@babel/plugin-proposal-numeric-separator'),
            require.resolve('@babel/plugin-proposal-throw-expressions'),

            // Stage 3
            require.resolve('@babel/plugin-syntax-dynamic-import'),
            require.resolve('@babel/plugin-syntax-import-meta'),
            [require.resolve('@babel/plugin-proposal-class-properties'), { 'loose': false }],
            require.resolve('@babel/plugin-proposal-json-strings'),

            [
                require.resolve('babel-plugin-module-resolver'),
                {
                    'root': ['.'],
                    'extensions': ['.js', '.jsx', '.ts', '.tsx'],
                    'alias': {
                        '#components': './src/components',
                    },
                },
            ],
        ],
    };
};
