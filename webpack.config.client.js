const path = require('path')
const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { run } = require('jest')
const CURRENT_WORKING_DIR = process.cwd()


const isDev = process.env.NODE_ENV !== 'production'

const config = {
    name: "browser",
    mode: isDev ? "development" : "production",
    devtool: isDev ? 'eval-source-map' : false,
    entry: [
        isDev && 'webpack-hot-middleware/client?reload=true',
        path.join(CURRENT_WORKING_DIR, './frontend/main.js')
    ].filter(Boolean),
    output: {
        path: path.join(CURRENT_WORKING_DIR, '/dist/'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            ['@babel/preset-react', { runtime: 'automatic' }]
                        ],
                        plugins: [
                            isDev && require.resolve('react-refresh/babel'),
                            require.resolve('@babel/plugin-transform-runtime')
                        ].filter(Boolean)
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'tailwindcss',
                                    'autoprefixer'
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|svg|gif|jpe?g|png)(\?[\s\S]+)?$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        isDev && new webpack.HotModuleReplacementPlugin(),
        isDev && new ReactRefreshWebpackPlugin({
            overlay: {
                sockIntegration: 'whm'
            }
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ].filter(Boolean),
    resolve: {
        fullySpecified: false,
    }
}

module.exports = config
