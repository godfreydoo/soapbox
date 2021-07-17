const path = require('path');
const SRC_DIR = path.join(__dirname, './src');
const DIST_DIR = path.join(__dirname, './dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  context: __dirname + '/src',
  entry: './index.jsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: path.resolve(__dirname, 'node_modules/'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  esmodules: true,
                }
              }],
              '@babel/preset-react'
            ]
          }
        }]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.[contenthash].js',
    assetModuleFilename: 'images/[hash][ext][query]',
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${SRC_DIR}/index.html`,
    }),
  ]
};
