const glob = require("glob");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const baseConfig = require("./webpack.base");
const { appBuild, appSrc } = require("./paths");

module.exports = merge(baseConfig, {
  mode: "production",
  devtool: false,
  target: "browserslist",
  output: {
    filename: "js/[name].[contenthash:8].js",
    path: appBuild,
    assetModuleFilename: "assets/[name].[contenthash:8].[ext]",
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new PurgeCSSPlugin({
    //   paths: glob.sync(`${appSrc}/**/*.{ts,tsx,scss,less,css}`, { nodir: true }),
    // }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 4,
        extractComments: false,
        terserOptions: {
          compress: { pure_funcs: ["console.log"] },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: "all",
      minSize: 0,
    },
  },
});
