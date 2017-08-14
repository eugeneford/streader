path = require("path");

module.exports = {
  entry: "./src/strider",
  output: {
    filename: "./dist/strider.js",
    libraryTarget: 'umd',
    library: 'Strider',
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
