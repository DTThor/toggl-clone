require('babel-polyfill');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: '.prod.env' }); // eslint-disable-line global-require
} else {
  require('dotenv').config(); // eslint-disable-line global-require
}
module.exports = {
  entry: ['babel-polyfill', path.join(__dirname, './src/frontend/index.js')],
  mode: process.env.NODE_ENV || 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(js)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html'),
      favicon: path.join(__dirname, './static/coralfavicon.ico'),
    }),
    new HtmlWebpackPlugin({
      filename: '200.html',
      template: path.join(__dirname, './index.html'),
      favicon: path.join(__dirname, './static/coralfavicon.ico'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_GITHUB_URL: JSON.stringify(process.env.API_GITHUB_URL),
        API_URL: JSON.stringify(process.env.API_URL),
        GITHUB_CLIENT_ID: JSON.stringify(process.env.GITHUB_CLIENT_ID),
        GITHUB_CLIENT_SECRET: JSON.stringify(process.env.GITHUB_CLIENT_SECRET),
        ADMIN_EMAIL: JSON.stringify(process.env.ADMIN_EMAIL),
      },
    }),
  ],
  devServer: {
    historyApiFallback: { index: '/' },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};
