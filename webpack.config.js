const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const rootPath = path.resolve(__dirname, "./");
const srcPath = path.resolve(rootPath, "./src");

module.exports = {
  entry: [
    "babel-polyfill",
    path.join(srcPath, "root/index.js"),
  ],
  output: {
    publicPath: "/",
  },
  resolve: {
    modules: [srcPath, "node_modules"],
    extensions: [".js", ".jsx"],
    alias: {
      "admin-lte-css": path.join(__dirname, "/node_modules/admin-lte/dist/css/adminlte.min.css"),
      "admin-lte-js": path.join(__dirname, "/node_modules/admin-lte/dist/js/adminlte.min.js"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ],
            plugins: [
              // "@babel/plugin-syntax-dynamic-import",
              // Allows to declare static attributes in classes.
              "@babel/plugin-proposal-class-properties",
            ],
          },
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    publicPath: "/",
    historyApiFallback: true,
    proxy: {
      "/api/v1": {
        target: "http://localhost:3000",
      },
    },
  },
};
