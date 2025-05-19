const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Multiple HTML entry pages
const pages = ['index', 'about', 'contact'];

module.exports = {
  entry: './src/js/main.js',

  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'docs'),
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
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'), // ✅ async Dart Sass API
              sassOptions: {
                silenceDeprecations: ['legacy-js-api']
              },
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.html$/i,
        use: ['html-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico|webp)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },

  plugins: [
    ...pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          filename: `${page}.html`,
          template: `./src/${page}.html`,
          favicon: './src/favicon.ico'
        })
    ),
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css'
    })
  ]
};
