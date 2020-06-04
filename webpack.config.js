const path = require('path');

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';

  return {
    devtool: isDev ? 'eval-source-map' : false,
    entry: './src/client.tsx',
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
      ]
    },
    output: {
      filename: isDev ? "[name].js" : "[name].[hash:8].js",
      path: path.resolve(process.cwd(), 'dist'),
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json']
    },
  };
}

