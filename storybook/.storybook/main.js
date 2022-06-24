const path = require('path');
const postcssPresetEnv = require('postcss-preset-env');
const postcssNested = require('postcss-nested');
const postcssNormalize = require('postcss-normalize');

const base = process.cwd();
const src = path.resolve(base, '../src/');
const stories = path.resolve(base, './stories/');

module.exports = {
    stories: [
        "../stories/*.stories.tsx",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-actions",
        "@storybook/addon-essentials",
        "@storybook/addon-a11y",
    ],
    framework: '@storybook/react',
    webpackFinal: async (config, { configType }) => {
        config.module.rules = config.module.rules
            .filter(item => String(item.test) !== String(/\.css$/))
        config.module.rules
            .push({
                test: /\.css$/,
                include: [src, stories],
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[name]_[local]_[hash:base64]',
                                exportLocalsConvention: 'camelCase',
                            },
                            esModule: true,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                postcssPresetEnv(),
                                postcssNested(),
                                postcssNormalize(),
                            ],
                            sourceMap: true,
                        },
                    },
                ],
            });

        return config;
    },
};
