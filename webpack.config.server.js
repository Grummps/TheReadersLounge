const path = require('path')
const nodeExternals = require('webpack-node-externals')
const CURRENT_WORKING_DIR = process.cwd()

module.exports = {
  name: 'server',
  entry: [path.join(CURRENT_WORKING_DIR, './backend/server.js')],
  target: 'node',
  output: {
    path: path.join(CURRENT_WORKING_DIR, '/dist/'),
    filename: 'server.generated.js',
    publicPath: '/dist/',
    libraryTarget: 'commonjs2'
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            configFile: false,
            presets: [
              ['@babel/preset-env', { targets: { node: 'current' } }],
              ['@babel/preset-react', { runtime: 'automatic' }]
            ],
            plugins: []  // no react-refresh/babel here
          }
        }
      },
      {
        test: /\.(ttf|eot|svg|gif|jpe?g|png)(\?[\s\S]+)?$/,
        use: 'file-loader'
      }
    ]
  }
}
