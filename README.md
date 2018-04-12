webpack4使用总结
1. 安装webpack的同时需要全局安装webpack-cli。
2. webpack4.x中webpack.config.js这样的配置文件不是必须的。 
3. 默认入口文件是./src/index.js，默认输出文件./dist/main.js，因此可以不定义。
4. webpack 4 引入了模式，包括 `development`、`production`、`none`三个值，我们不传入值的话，会默认使用 `production`

运行webpack命令默认寻找webpack.config.js文件并执行

若需指定其他配置文件 输入命令 `webpack --config filename`


# demo1 webpack的基本配置

1. 创建工程目录demo1,index.html和src目录下的index.js； 
2. 初始化工程目录：`npm init`。 
3. 全局安装webpack webpack-cli。 
4. 当前目录安装 `npm install webpack webpack-cli --save-dev`。
5. 创建weppack.config.js文件并配置
```
module.exports= {
	mode: "development", //设置运行模式
	context: path.resolve(__dirname,"./src"), //模块上下文
	entry: {
		app:"./index.js",
	},
	output: {
		path:path.resolve(__dirname,"./dist"),
		filename:"bundle.js"
	}
}
```
6. 可直接运行webpack命令，即可查看到编译的bundle.js文件
也可在package.json文件中添加运行命令并运行`npm start`

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack" //新增
  }
  ```

# demo2 多入口文件的自动化页面配置

## 多入口文件配置

```
entry :{
	a:"a.js",
	b:"b.js"
}
output {
	path:"./dist",
	filename :"[name]+[chunkhash].js"
}
```

利用占位符[name]
[hash]表每次编译的hash值 多个文件hash值相同
[chunkhash]每个文件之间不相同的hash值 文件改变后此值会发生变化 否则不变

## 在多个页面中引入带hash的js文件并自定义引入的文件
借助插件`html-webpack-plugin`
插件使用请参照(https://www.npmjs.com/package/html-webpack-plugin)

```
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
```
 
## 样式文件的引入
可以直接在require的时候加上loader前缀
`require("style-loader!css-loader!./bss.css");`

加载器执行顺序从后往前 此处顺序变化会报错 注意顺序
 其中css-loader使样式得以用require的方式引入而不报错
 style-loader使得样式加入到页面中生效

# demo3 babel-loader的使用

Babel其实是一个编译JavaScript的平台，可以将 JSX/ES6 文件转换成浏览器可以识别的js文件

而使用 [babel-loader](https://www.npmjs.com/package/babel-loader) 需要安装插件 [babel-preset-es2015](https://www.npmjs.com/package/babel-preset-es2015) 和 [babel-preset-react](https://www.npmjs.com/package/babel-preset-react)， 他们分别用来编译 ES6 and React. 

首先安装babel相关依赖

`npm install babel-loader babel-core babel-preset-es2015 babel-preset-react --save-dev`

本示例以react的JSX语法写页面 所以需先安装好 react 和 react-dom

babel相关配置如下：
```
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
        }
        ]
    }
```

# demo4 实时编译加载页面和sass-loader使用

实时编译依赖 `webpack-dev-server`,webpack-dev-server是一个小型的Node.js Express服务器

webpack输出真实的文件，而webpack-dev-server输出的文件只存在于内存中,不输出真实的文件！

首先安装
`npm install webpack-dev-server --save-dev`

然后在package.json里面自定义scripts
--content-base 指定自定义的index.html的位置 本示例为dist
很多配置参数请参照[webpack-dev-server](https://webpack.js.org/configuration/dev-server/#devserver)

```
// package.json
{
  // ...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --devtool eval --hot --progress --colors --content-base dist"
  },
  // ...
}
```

首先安装[sass-loader](https://www.npmjs.com/package/sass-loader) node-sass

`npm install sass-loader node-sass --save-dev`

webpack.config.js中进行如下配置

```
module: {
        rules: [
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                }, {
                    loader: "css-loader" //  将 CSS 转化成 CommonJS 模块
                }, {
                    loader: "sass-loader" // 将 Sass 编译成 CSS
                }]
            }

        ]
    }
```

最后运行命令 `npm run dev`

打开 (http://127.0.0.1:8080/) 即可看到页面 对页面相关文件进行修改会自动编译并刷新

# demo4 url-loader使用

[url-loader](https://www.npmjs.com/package/url-loader)主要用于图片处理

首先安装
`npm install --save-dev url-loader`

webpack.config.js

```
module.exports = {
  module: {
    rules: [
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
  }
}
```

index.jsx

```
import img from "./demo.png";
import img1 from "./demo1.png";

<img className="image" src={img}/>
<img className="image" src={img1}/>
```

运行webpack 生成自动化的页面 然后运行 npm run dev
此时会报错提示没有file-loader模块

所以还需要安装

`npm install --save-dev file-loader`

 url-loader可以设置文件的大小限制，小于限制的图片转base64(可减少一次http请求),其他情况用file-loader
然后运行 npm run dev 并打开 (http://127.0.0.1:8080/) 检查元素即可看到图片引用方式的不同

```
<img class="image" src="data:image/png;base64,iVBOR...jggg===">
<img class="image" src="/assets/a163bc6aa3f656d1d5ca6bc6a3f38b22.png">
```