var path = require('path');

module.exports = {
  entry: {
    Sprite: "./lib/Sprite.js",
    Game: "./lib/Game.js"
  },

  output: {
    path: __dirname,
    filename: "./build/[name].js",
    library: ["Pentagine", "[name]"],
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

  resolve: {
    root: [
      path.resolve('./lib/')
    ]
  },

  externals: {
    "underscore": "underscore"
  }
};
