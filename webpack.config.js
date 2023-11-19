const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash].js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Estas, mais de mesa',
      template: __dirname + '/src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(mp3)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(html)$/i,
        loader: 'html-loader'
      },
    ]
  },
  devServer: {
    static: './dist',
  },
  optimization: {
    runtimeChunk: 'single',
  }
};