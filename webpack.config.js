const path = require('path');

/**
 * Plugins
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/**
 * Env
 */

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

/**
 * Rules
 */

const css = {
  test: /\.css$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: { hmr: isDev, reload: true },
    },
    'css-loader',
  ],
};

const scss = {
  test: /\.s[ac]ss$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: { hmr: isDev, reload: true },
    },
    {
      loader: 'css-loader',
    },
    {
      loader: 'postcss-loader',
    },
    {
      loader: 'sass-loader',
    },
  ],
};

const images = {
  test: /\.(png|jpg|svg|gif)$/,
  use: [
    {
      loader: 'file-loader',
      options: { name: '[name].[ext]', outputPath: 'assets/images/' },
    },
  ],
};

const fonts = {
  test: /\.(ttf|woff|woff2|eot)$/,
  use: ['file-loader'],
};

const js = () => {
  const use = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: ['@babel/plugin-proposal-class-properties'],
      },
    },
  ];

  if (isDev) {
    use.push('eslint-loader');
  }

  return {
    test: /\.js$/,
    exclude: /node_modules/,
    use,
  };
};

const html = {
  test: /\.html$/,
  use: ['html-loader'],
};

/**
 * Config
 */

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: {
    main: ['@babel/polyfill', path.resolve(__dirname, 'src/index.js')],
  },
  output: {
    filename: isDev ? '[name].js' : '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [new OptimizeCssAssetsWebpackPlugin(), new TerserWebpackPlugin()],
    minimize: isProd,
  },
  devServer: {
    port: 3000,
    hot: isDev,
  },
  devtool: isDev ? 'source-map' : '',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.ejs'),
      filename: 'index.html',
      minify: { collapseWhitespace: isProd },
      favicon: path.resolve(__dirname, 'src/assets/images/favicon.ico'),
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[hash].css',
    }),
  ],
  module: {
    rules: [css, scss, images, fonts, js(), html],
  },
};
