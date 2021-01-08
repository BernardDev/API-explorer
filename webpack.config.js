const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  // mode: 'development',
  // when using dev: ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development")
  entry: './src/index.js',
  devServer: {
    contentBase: './dist',
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        // test: /\.css$/i,
        test: /\.s[ac]ss$/i,
        // use: [
        //   // Creates `style` nodes from JS strings
        //   'style-loader',
        //   // Translates CSS into CommonJS
        //   'css-loader',
        //   // Compiles Sass to CSS
        //   'sass-loader',
        // ],
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
};
