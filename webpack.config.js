const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

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
    ])
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};

// plugins: [
//   new HtmlWebpackPlugin({
//       template: 'src/index.html'
//   })
// ],