const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const config = {
    mode: "development",
    entry: {
        app: ["./src/index.jsx"]
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "js/bundle.js",
        publicPath: "/assets/"
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["es2015", "react"]
                }
            }
        },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                }, {
                    loader: "css-loader" //  将 CSS 转化成 CommonJS 模块
                // options: {
                //     modules: true
                // }
                }, {
                    loader: "sass-loader" // 将 Sass 编译成 CSS
                }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 28745
                        }
                    }
                ]
            }

        ]
    },
    plugins: [
        //多页面自动化需定义多个htmlWebpackPlugin
        new htmlWebpackPlugin({
            template: './index.html',
            minify: {
                removeComments: true, //去除注释
                collapseWhitespace: true //去除空格
            }
        })
    ]
}
module.exports = config;