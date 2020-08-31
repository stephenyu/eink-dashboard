const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { dashboard } = require('./src/web/index.tsx');

const stableLibraries = ['react', 'scheduler', 'react-dom', 'styled-components'];

const HtmlConfig = {
  dashboard,
  template: './src/html/index.html',
  inject: true,
};

module.exports = {
  entry: './src/web/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        loader: 'url-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(HtmlConfig)
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test(module) {
            return module.resource &&
                  module.resource.includes('node_modules') &&
                  stableLibraries.some(name => module.resource.includes(`/${name}/`));
          }
        },
        libs: {
          name: 'libaries',
          test(module) {
            return module.resource &&
                  module.resource.includes('node_modules') &&
                  stableLibraries.every(name => !module.resource.includes(`/${name}/`));
          }
        },
      }
    }
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
