const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const config = {
    mode: "development",
    entry: {
        app: "./src/index.js",
        main: "./src/main.js"
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "js/[name]-[chunkhash].js",
        publicPath: "http://www.baidu.com/" //上线地址 页面中引入的文件以此地址开头
    },
    plugins: [
        //多页面自动化需定义多个htmlWebpackPlugin
        new htmlWebpackPlugin({
            template: './index.html',
            filename: 'a.html',
            title: 'index.html',
            chunks: ["app"] //按需加载文件
        // excludeChunks: ["main"] //排除加载
        // minify: {
        //     removeComments: true, //去除注释
        //     collapseWhitespace: true //去除空格
        // }
        }),
        new htmlWebpackPlugin({
            template: './index.html',
            filename: 'b.html',
            title: 'index1.html',
            chunks: ["main"]
        })
    ]
}
module.exports = config;