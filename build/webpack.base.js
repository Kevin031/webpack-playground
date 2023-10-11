const path = require("path");
const ConsoleLogOnBuildWebpackPlugin = require("./plugins/console");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpackJson = require("webpack/package.json");
const ProgressPlugin = require("progress-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

console.log("isDev", isDev);

module.exports = {
  entry: path.resolve(__dirname, "../src/main.js"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].bundle.[chunkhash:8].js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [path.resolve(__dirname, "../src")],
        use: [
          // {
          //   loader: "thread-loader",
          // },
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          // {
          //   loader: "style-loader",
          // },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["autoprefixer"],
              },
            },
          },
          {
            loader: "less-loader",
          },
        ],
      },
      {
        test: /.(jpeg|png|svg)$/,
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "assets/img/[name].[hash:8][ext]", // 文件输出目录和命名
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ConsoleLogOnBuildWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      webpackVersion: webpackJson.version,
      minify: false,
      removeComments: false,
    }),
    new MiniCssExtractPlugin({
      filename: "./css/style.css",
    }),
    new ProgressPlugin(true),
  ],
};
