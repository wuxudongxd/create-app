const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const WebpackBar = require("webpackbar");
const paths = require("./paths");

const isDevelopment = process.env.NODE_ENV !== "production";
const isProduction = !isDevelopment;

const getCssLoaders = () => [
  isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
  "css-loader",
  {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: [
          require("postcss-flexbugs-fixes"),
          isProduction && [
            "postcss-preset-env",
            {
              autoprefixer: {
                grid: true,
                flexbox: "no-2009",
              },
              stage: 3,
            },
          ],
        ].filter(Boolean),
      },
    },
  },
];

module.exports = {
  entry: {
    app: paths.appIndex,
  },
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
    alias: {
      "@src": paths.appSrc,
      "@components": paths.appSrcComponents,
      "@utils": paths.appSrcUtils,
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getCssLoaders(),
      },
      {
        test: /\.scss$/,
        use: [...getCssLoaders(), "sass-loader"],
      },
      {
        test: /\.(ts?|js?)$/,
        loader: "babel-loader",
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2?)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      cache: true,
    }),
    new CopyPlugin({
      patterns: [
        {
          context: paths.appPublic,
          from: "*",
          to: paths.appBuild,
          toType: "dir",
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
    new WebpackBar({
      name: isDevelopment ? "RUNNING" : "BUNDLING",
      color: isDevelopment ? "#52c41a" : "#722ed1",
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: paths.appTsConfig,
      },
    }),
    isProduction &&
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
        ignoreOrder: false,
      }),
  ].filter(Boolean),
};
