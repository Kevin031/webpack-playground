const prodConfig = require("./webpack.prod.js");
const { merge } = require("webpack-merge");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const cssPluginIndex = prodConfig.plugins.findIndex(
  (e) => e.constructor.name === "MiniCssExtractPlugin"
);
const cssPlugin = prodConfig.plugins.find(
  (e) => e.constructor.name === "MiniCssExtractPlugin"
);
const configToExport = smp.wrap(merge(prodConfig, {}));
configToExport.plugins[cssPluginIndex] = cssPlugin;
module.exports = configToExport;
