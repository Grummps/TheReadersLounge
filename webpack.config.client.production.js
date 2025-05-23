const path = require('path')
const CURRENT_WORKING_DIR = process.cwd()

const config = {
    mode: "production",
    entry: [path.join(CURRENT_WORKING_DIR, './frontend/main.js')],
    output: {
        path: path.join(CURRENT_WORKING_DIR, '/dist/'),
        filename: 'bundle.js',
        publicPath: "/dist/"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
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
                test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
                use: 'file-loader'
            }
        ]
    },
    resolve: {
        fullySpecified: false,
    },
}
module.exports = config