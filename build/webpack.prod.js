const { merge } = require('webpack-merge');
const common = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssertsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')


module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html')
        })
    ],
    optimization: {
        // 将第三方库(library)（例如 lodash 或 react）提取到单独的 vendor chunk 文件中
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial'
                }
            }
        },
        minimizer: [
            new OptimizeCssAssertsPlugin({}),
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                parallel: true,
                terserOptions: {
                    output: {
                        comments: false
                    }
                }
            })
        ]
    },
    module: {
        rules: [{
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
                'file-loader',
                {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                        progressive: true,
                        quality: 65
                        },
                        // optipng.enabled: false will disable optipng
                        optipng: {
                        enabled: false,
                        },
                        pngquant: {
                        quality: '65-90',
                        speed: 4
                        },
                        gifsicle: {
                        interlaced: false,
                        },
                        // the webp option will enable WEBP
                        webp: {
                        quality: 75
                        }
                    }
                }
            ]
        }]
    }
})
