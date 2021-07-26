const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    index: ['./src/pages/index.js'],
    profile: ['./src/pages/profile.js'],
    title: ['./src/pages/title.js']
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(gif|jpeg|jpg|png|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      },
      {
        // test: /\.css$/i,
        test: /\.s[ac]ss$/i,
        use: [
          // Extracts CSS into separate files.
          // https://webpack.js.org/plugins/mini-css-extract-plugin
          MiniCssExtractPlugin.loader,
          // Interprets @import and url() like import/require() and will resolve them.
          // https://webpack.js.org/loaders/css-loader/
          'css-loader',
          // Loads a Sass/SCSS file and compiles it to CSS.
          // https://webpack.js.org/loaders/sass-loader
          'sass-loader',
        ],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
    new CopyPlugin({
      patterns: [
        { from: 'CNAME' },
      ],
    }),
    new MiniCssExtractPlugin({
      // https://webpack.js.org/plugins/mini-css-extract-plugin/#filename
      filename: 'css/index.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      chunks: ['index'],
      filename: 'index.html',
      template: 'template.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['profile'],
      filename: 'profile/index.html',
      template: 'template.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['title'],
      filename: 'title/index.html',
      template: 'template.html'
    })
  ],
  output: {
    // By default, asset/resource modules are emitting with [hash][ext][query] filename into output directory.
    // https://webpack.js.org/guides/asset-modules/#custom-output-filename
    assetModuleFilename: '[file]',
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, 'docs'),
  },
}
