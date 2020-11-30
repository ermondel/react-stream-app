const path = require('path');

/**
 * Plugins
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/**
 * Rules
 */

const css = {
  test: /\.css$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: { hmr: true, reload: true },
    },
    'css-loader',
  ],
};

const scss = {
  test: /\.s[ac]ss/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: { hmr: true, reload: true },
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
  use: [
    {
      loader: 'file-loader',
    },
  ],
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
    'eslint-loader',
  ];

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
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './src/index.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    port: 3000,
    hot: true,
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      filename: 'index.html',
      favicon: './src/assets/images/favicon.ico',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  module: {
    rules: [css, scss, images, fonts, js(), html],
  },
};
