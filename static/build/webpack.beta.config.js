/*
 * @FileDescription    : local config  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-05-15 14:40:25 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: yyyy-11-We 04:54:33
 */

'use strict';

var merge = require("webpack-merge");
var webpack = require("webpack");
var baseWebpackConfig = require("./webpack.default.config");
var path = require('path');

const ASSET_PATH = "/public/dist/";

module.exports = merge(baseWebpackConfig, {
    mode: "production",
    devtool: false,
    output: {
        path: path.join(__dirname, "../../app/public/dist/"), //打包后的文件存放的地方
        publicPath: "/public/dist/",
        filename: "[name]-[chunkhash:5].js"
    },
    plugins: [new webpack.DefinePlugin({
        "process.env": {
            ASSET_PATH: JSON.stringify(ASSET_PATH),
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            API_URL  : JSON.stringify("//touyan_pingyi.databurning.com"),
            OLD_VERSION_URL: JSON.stringify('https://insight.databurning.com'),
            MiCRO_APP_URL: JSON.stringify('//micro.beta.databurning.com/page/appAnalyze/'),
            MiCRO_PM_URL: JSON.stringify('//micro.beta.databurning.com/page/appPM/'),
            MiCRO_SM_URL: JSON.stringify('//micro.beta.databurning.com/page/appSM/'),
        }
    })]
});
