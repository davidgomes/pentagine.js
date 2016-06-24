import path from 'path';
import UnminifiedWebpackPlugin from 'unminified-webpack-plugin';
var webpack = require('webpack');

export default {
  entry: {
    Pentagine: "./lib/pentagine.js",

    HelicopterDemo: "./demos/helicopter_game/PlayState.js",
    CircleExample: "./demos/circle_example/PlayState.js"
  },

  output: {
    path: __dirname,
    filename: "./build/[name].js",
    library: "[name]",
    libraryTarget: "umd"
  },

  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

    new UnminifiedWebpackPlugin()
  ],

  resolve: {
    root: [
      path.resolve('./lib/')
    ]
  },

  externals: {
    "underscore": "underscore"
  }
};
