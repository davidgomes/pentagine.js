module.exports = {
  entry: {
    pentagine: "./lib/entry.js",
  },

  output: {
    path: __dirname,
    filename: "./build/[name].js",
    libraryTarget: 'umd'
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
  }
};
