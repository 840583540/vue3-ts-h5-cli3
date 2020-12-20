const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')
const Fiber = require('fibers')
const sass = require('sass')

module.exports = {
    entry: path.join(__dirname, '../src/main.ts'),
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
              test: /\.vue$/,
              use: 'vue-loader'
            },
            {
                test: /\.(ts|tsx)$/,
                use: [{
                  loader: 'ts-loader',
                  options: {
                    appendTsSuffixTo: [/.vue$/],
                  }
                }],
                exclude: /node_modules/
            },
            {
              test: /\.(png|svg|jpg|gif)$/,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    limit: 5000,
                    name: 'imgs/[hash].[ext]'
                  }
                }
              ]
            },
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader']
            },
            {
              test: /\.(scss|sass)$/,
              use: [
                'style-loader',
                'css-loader',
                {
                  loader: 'sass-loader',
                  options: {
                    implementation: sass,
                    sassOptions: {
                      fiber: Fiber,
                    }
                  }
                },
                'postcss-loader'
              ]
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        // 创建别名
        alias: {
          '@': path.resolve(__dirname, '../src/')
        }

    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin()
    ]
}