const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/preset-react']
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: "/",
    compress: true,
    port: 8000,
    historyApiFallback: true,
  },
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  devtool: "source-map"
};