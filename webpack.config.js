const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');


module.exports = {
  entry: './src/index.js',
  plugins: [
    new CleanWebpackPlugin({
      from: 'src/css/',
      to: './'
  }),
    new HtmlWebpackPlugin({
      title: 'XO',
      template: 'src/index.html'
    }),
    new CopyPlugin([
      { from: 'src/assets', to: 'assets' },
    ]),
    new HtmlWebpackIncludeAssetsPlugin ({
      assets: ['style.css'],
      append: true
  }),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
        {
            test: /\.css$/,
            loader: 'style!css',
        },
        {
            test: /\.js$/,
            loader: 'babel-loader'
        }
    ]
},
};
