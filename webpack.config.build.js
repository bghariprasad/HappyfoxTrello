const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackConfig = require('./webpack.config');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const MinifyPlugin = require('babel-minify-webpack-plugin');

// const IS_PROD = (process.env.NODE_ENV === 'production');
module.exports = merge(webpackConfig, {
  mode: 'production',
  optimization: {
    nodeEnv: 'production',
    minimize: true,
    mergeDuplicateChunks: true,
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          enforce: true,
          chunks: 'all'
        }
      }
    }
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new MinifyPlugin({}, {
      test: /\.js($|\?)/i
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }]
      },
      canPrint: true
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new WebpackPwaManifest({
      name: 'React app',
      short_name: 'React app',
      description: 'A simple react app',
      background_color: '#EEFBFF',
      theme_color: '#2898E5',
      display: 'standalone',
      icons: [
        {
          src: path.resolve('./assets/favicon/happyfox-color.png'),
          sizes: '250x192',
          type: 'image/png'
        },
        {
          src: path.resolve('./assets/favicon/happyfox-color.png'),
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    })
  ]
});
