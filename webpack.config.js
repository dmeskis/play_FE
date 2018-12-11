const path = require('path');
const Dotenv = require('dotenv-webpack');
if ((process.env.NODE_ENV || 'production') === 'production') {
  require('dotenv').load();
}

module.exports = {
  entry: {
    main: "./lib/index.js",
    test: "mocha!./test/index.js"
  },
  output: {
    path: __dirname,
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader"] },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.css', '.scss']
  },
  plugins: [
    new Dotenv({
        path: path.resolve(__dirname, '..', '.env'),
    }),
],
  node: {
     fs: "empty"
  }
};
