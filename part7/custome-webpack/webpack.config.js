const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');
const webpack = require('webpack')



const config = (env, argv) => {

    console.log('argv', argv.mode)

    const backend_url = argv.mode === 'production'
        ? 'https://radiant-plateau-25399.herokuapp.com/api/notes'
        : 'http://localhost:3001/notes'

    return {
        entry: ["@babel/polyfill", "./src/index.js"],
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'main.js'
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "styles.css"
            }),
            new HtmlWebpackPlugin({ title: 'My App' }),
            new HtmlWebpackRootPlugin(),
            new webpack.DefinePlugin({
                BACKEND_URL: JSON.stringify(backend_url)
            }),
            

        ],
        devtool: 'source-map',
        devServer: {
            contentBase: path.resolve(__dirname, 'build'),
            compress: true,
            port: 3000,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },

                {
                    test: /\.s?css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                }

            ]
        }
    }
}
module.exports = config