const path = require('path');
const webpack = require('webpack');
const LoadablePlugin = require('@loadable/webpack-plugin')
const PnpWebpackPlugin = require('pnp-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const isDev = mode === 'development';

const loadPlugins = () => {
  const plugins = [
    new LoadablePlugin({
      writeToDisk: true,
      filename: "./loadable-stats.json",
    })
  ];

  if (isDev) {
    plugins.push(
      // webpack-hot-middleware
      new webpack.HotModuleReplacementPlugin(),
    );
  }

  return plugins;
};

module.exports = {
  devtool: isDev ? 'eval-source-map' : false,
  entry: (isDev ? ['webpack-hot-middleware/client?reload=true', './src/client.tsx'] : ['./src/client.tsx']),
  mode,
  module: {
    rules: [
      {
        test: /\.(j|t)s(x)$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: isDev,
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
      },
    ]
  },
  output: {
    filename: isDev ? "[name].js" : "[name].[hash:8].js",
    path: path.resolve(process.cwd(), 'dist'),
  },
  plugins: loadPlugins(),
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    plugins: [
      PnpWebpackPlugin,
    ],
  },
  resolveLoader: {
    moduleExtensions: ["-loader"],
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
};
