const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.js");
// const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  plugins: [
    // new ReactRefreshWebpackPlugin()
  ],
  devServer: {
    port: 3000,
    compress: false,
    hot: true,
    historyApiFallback: true,
  },
});
