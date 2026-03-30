const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Добавь эту строку

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Music Event Dashboard'
    })
  ],
  devServer: {
    static: './dist',
    hot: true,
    port: 3000
  }
};