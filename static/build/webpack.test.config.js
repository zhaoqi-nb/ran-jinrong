/*
 * @FileDescription    : local config  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-05-15 14:40:25 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: yyyy-11-We 05:00:47
 */

'use strict';

var merge = require("webpack-merge");
var webpack = require("webpack");
var baseWebpackConfig = require("./webpack.default.config");
const path = require('path');
const ASSET_PATH = "/public/dist/";

module.exports = merge(baseWebpackConfig, {
    mode: "production",
    devtool: false,
    output: {
        path: path.join(__dirname, "../../app/public/dist/"),
        // path: "/usr/local/servers/ranshu-finance-node/app/public/dist/", //打包后的文件存放的地方
        publicPath: ASSET_PATH,
        filename: "[name]-[chunkhash:5].js"
    },
    plugins: [new webpack.DefinePlugin({
            "process.env": {
                ASSET_PATH: JSON.stringify(ASSET_PATH),
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                API_URL  : JSON.stringify("//touyan_pingyi.test.inc"),
                OLD_VERSION_URL: JSON.stringify('//touyan.test.inc'),
                MiCRO_APP_URL: JSON.stringify('//micro.test.inc/page/appAnalyze/'),
                MiCRO_PM_URL: JSON.stringify('//micro.test.inc/page/appPM/'),
                MiCRO_SM_URL: JSON.stringify('//micro.test.inc/page/appSM/'),
            }
    })]
});
