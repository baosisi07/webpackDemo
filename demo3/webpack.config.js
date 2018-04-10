const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const config = {
    mode: "development",
    entry: {
        app: "./src/index.jsx"
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "js/bundle.js",

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
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },

        ]
    },
    plugins: [
        //多页面自动化需定义多个htmlWebpackPlugin
        new htmlWebpackPlugin({
            template: './index.html',
            filename: 'babel.html',
            minify: {
                removeComments: true, //去除注释
                collapseWhitespace: true //去除空格
            }
        })
    ]
}
module.exports = config;