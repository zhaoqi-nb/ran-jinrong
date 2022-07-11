/*
 * @FileDescription    : webpack default config 
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-05-15 14:30:27 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: yyyy-09-Su 05:20:02
 */

'use strict';

const webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    Alias = require("./alias");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require("copy-webpack-plugin");


module.exports = {
    entry: {
        index: ["./static/src/page/index.jsx"],
    },
    module: {
        rules: [{
            test: /(\.jsx|\.js)$/,
            use: [
                {
                    loader: 'thread-loader',
                    options: {
                        workers: 6
                    }
                },
                'babel-loader'
            ],
            exclude: /node_modules/
        }, {
            test: /\.mjs$/,
            include: /node_modules/, // is this line needed? idk
            type: "javascript/auto"
        }, {
            test: /\.css$/,
            use: [{
                loader: 'thread-loader',
                options: {
                    workers: 6
                }
            }, {
                loader: "style-loader"
            }, {
                loader: "css-loader",
            }]
        }, {
            test: /\.less$/,
            use: [
                {
                    loader: 'thread-loader',
                    options: {
                        workers: 6
                    }
                },
                {
                    loader: 'style-loader',
                },
                {
                    loader: 'css-loader', // translates CSS into CommonJS
                },
                {
                    loader: 'less-loader', // compiles Less to CSS
                    options: {
                        lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                            modifyVars: {
                            },
                            javascriptEnabled: true
                        }
                    }
                }
            ]
        }, {
            test: /\.(html|htm)$/i,
            use: [{
                loader: "html-withimg-loader"
            }]
        }, {
            test: /\.(png|jpg|gif|woff|svg|eot|ttf)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    esModule: false,
                    name: "[name].[ext]"
                }
            }]
        }, {
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]?[hash]'
            }
        }]
    },
    resolve: {
        extensions: [
            ".js", ".jsx"
        ],
        modules: [path.join(__dirname, "../src"), "node_modules"],
        alias: Alias,
    },
    externals: {
        'BMap': 'BMap',
        'mapv': 'mapv',
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    node: {
        fs: "empty"
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["**/*", "!read.txt",]
        }),
        new webpack.BannerPlugin('燃数科技出品，翻版必究'),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../../app/view/index.nj'),
            template: path.resolve(__dirname, '../src/page/html/index.ejs')
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../src/img'),
                    to: path.join(__dirname, "../../app/public/dist/img")
                },
                {
                    from: path.resolve(__dirname, '../public'),
                    to: path.join(__dirname, "../../app/public/dist/public")
                },
            ],
        })
        // new BundleAnalyzerPlugin(),
    ]
}
