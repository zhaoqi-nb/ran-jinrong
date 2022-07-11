/*
 * @FileDescription    : local config  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-05-15 14:40:25 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: yyyy-11-We 04:12:35
 */

'use strict';

const merge = require("webpack-merge");
const webpack = require("webpack");
const baseWebpackConfig = require("./webpack.default.config");
const path = require('path');

const mode = JSON.stringify(process.env.NODE_ENV);

// console.log('TerserPlugin', TerserPlugin)

const ASSET_PATH = "//localhost:8081/app/public/dist/";

module.exports = merge(baseWebpackConfig, {
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    // devtool: false,
    output: {
        path: path.join(__dirname, "../../app/public/dist/"), //打包后的文件存放的地方
        publicPath: ASSET_PATH,
        // publicPath: "//127.0.0.1:8080/app/public/dist/",
        filename: "[name].js"
    },
    devServer: {
        hot: true,
        compress: true,
        disableHostCheck: true,
        port: '8081', //设置端口号
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        }
    },
    plugins: [new webpack.DefinePlugin({
        "process.env": {
            ASSET_PATH: JSON.stringify(ASSET_PATH),
            NODE_ENV: mode,
            API_URL: JSON.stringify("//127.0.0.1:8080"), // webpack-dev-server
            OLD_VERSION_URL: JSON.stringify('//touyan.test.inc'),
            MiCRO_APP_URL: JSON.stringify('//localhost:6100'),
            MiCRO_PM_URL: JSON.stringify('//localhost:6101'),
            MiCRO_SM_URL: JSON.stringify('//localhost:6102'),
        }
    })]
});
