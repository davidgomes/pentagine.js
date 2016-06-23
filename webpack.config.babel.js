import path from 'path';

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

  resolve: {
    root: [
      path.resolve('./lib/')
    ]
  },

  externals: {
    "underscore": "underscore"
  }
};
