const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: 'js/[name].[hash].js',
        path: path.resolve(__dirname, '../dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.dev.html')
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        compress: true,
        port: 8008,
        hot: true
    }
  })