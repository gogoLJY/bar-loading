const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const FriendlyErrorPlugin = require('friendly-errors-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: 'development',
  devtool: isProduction ? false : 'cheap-module-eval-source-map',
  entry: './examples/index.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'js/[name].[hash].js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'docs'),
    host: 'localhost',
    port: 8085,
    open: true,
    hot: true,
    overlay: {
      warnings: false,
      errors: true
    },
    stats: 'errors-only',
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.vue', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader :
            {
              loader: 'style-loader',
            },
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProduction,
            }
          },
        ],
      },

      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        options: {
          loaders: {
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './examples/index.html',
      inject: true,
      minify: {
        removeComments: isProduction,
        collapseWhitespace: isProduction,
        removeAttributeQuotes: isProduction,
        minifyJS: isProduction,
        minifyCSS: isProduction,
        minifyURLs: isProduction,
      }
    }),
    new VueLoaderPlugin(),
    new FriendlyErrorPlugin()
  ],
  stats: {
    colors: true,
    modules: false, // 是否添加关于构建模块的信息
    children: false, // 是否添加关于子模块的信息
    chunks: false, //  是否添加关于 chunk 的信息
    chunkModules: false // 是否添加关于已构建模块和关于 chunk 的信息
  }
}

if (isProduction) {
  module.exports.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'css/demo-[hash].css',
    }),
  );
  module.exports.optimization.minimizer.push(
    new TerserPlugin({
      sourceMap: false,
      terserOptions: {
        output: {
          beautify: false,
        },
        compress: {
          drop_debugger: true,
          drop_console: true
        }
      }
    }),
  );
}
