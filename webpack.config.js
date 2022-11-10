const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: './src/js/index.js',
        utilities: './src/js/utilities.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist'
        },
    plugins: [
        new CleanWebpackPlugin(),
        new NodePolyfillPlugin(),
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Urban Area Info App',
            template: './src/index.html',
            filename: '../dist/index.html'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        fallback: {
            // "https": false,
            // "http": false,
            // "url": false,
            // "zlib": false,
            // "assert": false,
        }
    },
    module: {
        
        rules: [
            {
                test: /\.(s(a|c)ss)$/,
                use: ['style-loader','css-loader', 'sass-loader']
            }
        ]
    },
 };