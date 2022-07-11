/**
 * 生成模式配置
 * 
 * 
 */
const webpack           = require("webpack"),
      merge             = require("webpack-merge"),
      path              = require('path'),
      baseWebpackConfig = require("./webpack.default.config");

const TerserPlugin = require('terser-webpack-plugin');

const ASSET_PATH = "/public/dist/";

module.exports = merge(baseWebpackConfig, {
    mode: "production",
    devtool: false,
    output: {
        path: path.join(__dirname, '../../app/public/dist'),//"/usr/local/servers/ranshu-finance-node/app/public/dist/",//打包后的文件存放的地方
        publicPath: "/public/dist/",
        filename: "[name]-[chunkhash:5].js"
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                ASSET_PATH: JSON.stringify(ASSET_PATH),
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                API_URL  : JSON.stringify("//touyan_pingyi.databurning.com"),
                OLD_VERSION_URL: JSON.stringify('https://insight.databurning.com'),
                MiCRO_APP_URL: JSON.stringify('https://micro.databurning.com/page/appAnalyze/'),
                MiCRO_PM_URL: JSON.stringify('https://micro.databurning.com/page/appPM/'),
                MiCRO_SM_URL: JSON.stringify('https://micro.databurning.com/page/appSM/'),
            }
        })
    ],
    // optimization: {
    //     minimizer: [
    //         new TerserPlugin({
    //             parallel: false
    //         })
    //     ]
    // }
});
