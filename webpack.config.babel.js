import path from 'path';

export default {
  entry: {
    pentagine: "./lib/pentagine.js",

    helicopter_demo: "./demos/helicopter_game/PlayState.js",
    circle_demo: "./demos/circle_example/PlayState.js"
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

  resolve: {
    root: [
      path.resolve('./lib/')
    ]
  },

  externals: {
    "underscore": "underscore"
  }
};
