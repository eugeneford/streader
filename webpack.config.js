path = require("path");

module.exports = {
  entry: "./src/streader",
  output: {
    filename: "./dist/streader.js",
    libraryTarget: 'umd',
    library: 'Streader',
    auxiliaryComment: "istanbul ignore next"
  },

  module: {
    loaders: [{
      test: /\.es6$/,
      include: [
        path.resolve(__dirname, "src/")
      ],
      loader: 'babel-loader'
    }]
  },

  resolve: {
    extensions: ['', '.js', '.es6']
  }
};
