const path = require("path");
const webpack = require("webpack");
const LoadablePlugin = require("@loadable/webpack-plugin");
const PnpWebpackPlugin = require("pnp-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const mode = process.env.NODE_ENV || "development";
const isDev = mode === "development";

const loadPlugins = () => {
  const plugins = [
    new LoadablePlugin({
      writeToDisk: true,
      filename: "./loadable-stats.json",
    }),
    new webpack.DefinePlugin({
      DEV: isDev,
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? "[name].css" : "[name].[contenthash:8].css",
      chunkFilename: isDev ? "[id].css" : "[id].[contenthash:8].css",
    }),
  ];

  if (isDev) {
    plugins.push(
      // webpack-hot-middleware
      new webpack.HotModuleReplacementPlugin()
    );
  } else {
    plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
  }

  return plugins;
};

module.exports = {
  devtool: isDev ? "eval-source-map" : false,
  entry: isDev
    ? ["webpack-hot-middleware/client?reload=true", "./src/client.tsx"]
    : ["./src/client.tsx"],
  mode,
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve("babel-loader"),
          options: {
            cacheDirectory: isDev,
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: isDev, reloadAll: true },
          },
          { loader: "css", options: { importLoaders: 1 } },
        ],
      },
      {
        test: /\.less$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css", options: { importLoaders: 3 } },
          {
            loader: "less",
            options: { lessOptions: { javascriptEnabled: true } },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
      },
    ],
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  output: {
    filename: isDev ? "[name].js" : "[name].[hash:8].js",
    path: path.resolve(process.cwd(), "dist"),
  },
  plugins: loadPlugins(),
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    plugins: [PnpWebpackPlugin],
  },
  resolveLoader: {
    moduleExtensions: ["-loader"],
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
};
