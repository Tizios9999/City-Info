const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: './src/js/index.js',
        secondary: './src/js/secondary.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist'
        },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({})
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
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