const glob = require('glob');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const baseConfig = require('./webpack.base');
const { appBuild, appSrc } = require('../paths');

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: false,
  target: 'browserslist',
  output: {
    filename: 'js/[name].[contenthash:8].js',
    path: appBuild,
    assetModuleFilename: 'images/[name].[contenthash:8].[ext]',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new PurgeCSSPlugin({
      paths: glob.sync(`${appSrc}/**/*.{tsx,scss,less,css}`, { nodir: true }),
    }),
    new webpack.BannerPlugin({
      raw: true,
      banner:
        '/** @preserve Powered by webpack-quick-starter (https://github.com/wuxudongxd/webpack-quick-start) */',
    }),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'server', // 开一个本地服务查看报告
    //   analyzerHost: '127.0.0.1', // host 设置
    //   analyzerPort: 8888, // 端口号设置
    // }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 4,
        extractComments: false,
        terserOptions: {
          compress: { pure_funcs: ['console.log'] },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
  },
});
