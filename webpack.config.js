module.exports = {
  entry: {
    pentagine: "./lib/pentagine.js",
  },

  output: {
    path: __dirname,
    filename: "./build/[name].js",
    libraryTarget: 'umd'
  }
};
