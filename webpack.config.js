const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const pages = ['index', 'about', 'contact'];

module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devServer: {
    static: './dist',
    open: true,
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.js$/, exclude: /node_modules/,
        use: {
          loader: 'babel-loader', options: { presets: ['@babel/preset-env'] }
        }
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    ...pages.map(page => new HtmlWebpackPlugin({
      filename: `${page}.html`,
      template: `./src/${page}.html`
    })),
    new MiniCssExtractPlugin({ filename: 'styles.[contenthash].css' })
  ]
};
