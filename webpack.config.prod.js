var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');  // 导出额外的文件插件
var StringReplacePlugin = require('string-replace-webpack-plugin'); // 字符串替换插件
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 单行日志输出
const singleLog = require('single-line-log').stdout;

// 获取环境变量, 方便做不同处理
// stage, product打包处理方式略有不同, 如assets资源的引用路径
var env = process.env.NODE_ENV;
// 读取项目配置文件
// 获得项目名称及版本, 方便做打包处理assets cdn路径
var packageJSON = require('./package.json');
var projectVersion = packageJSON.version;
var projectName = packageJSON.name;
var cssmode = packageJSON.cssmode;
var gitlabGroup = packageJSON.gitlabGroup;
var cdnDomain = packageJSON.cdnDomain;

function resolve (dir) {
    return path.join(__dirname, './', dir)
}

const extractCSS = new ExtractTextPlugin({
    allChunks: true,
    filename: '[name].css'
});

// 声明cssloader
var cssLoader = {
    test: /\.(css|less)$/,
    loader: ExtractTextPlugin.extract([
        'css-loader?minimize=true',
        'postcss-loader',
        'less-loader'
    ])
};

// 输出口
var output = {
    path: path.resolve(__dirname, "build"),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js?t=[chunkhash:5]',
    publicPath: '/'
};

// 为product环境打包时
if (env == 'product') {
    // 定制cdn路径
    output.publicPath = '//' + cdnDomain + '/' + gitlabGroup + '/' + projectName + '/' + projectVersion + '/assets/';
    cssLoader.loader = ExtractTextPlugin.extract("css-loader", "postcss-loader");
    delete cssLoader.use;
}

if (env == 'stage') {
     // 定制cdn路径
    output.publicPath = '/' + gitlabGroup + '/' + projectName + '/' + projectVersion + '/assets/';
    cssLoader.loader = ExtractTextPlugin.extract("css-loader", "postcss-loader");
    delete cssLoader.use;
}

var config = {
    entry: {
        // 可对应多个入口文件
        webapp: ['./js/app-ace.js'],
        vendor: ['react', 'react-dom', 'react-router', 'mobx-react']
    },
    output: output,
    // devtool: 'source-map', // 输出source-map
    module: {
        loaders: [
            {
                test: /\.tmpl$/,
                loader: "underscore-template-loader",
                query: {
                    engine: 'lodash'
                }
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: [
                        'transform-remove-strict-mode',
                        'transform-decorators-legacy',
                        ["transform-runtime", {"helpers": false, "polyfill": false, "regenerator": true, "moduleName": "babel-runtime"}],
                        ["import", [{ "libraryName": "antd", "style": "css" }]]
                    ]
                }
            },
            {
                test: /\.vue$/, // vue-loader 加载.vue单文件组件
                loader: 'vue'
            },
            cssLoader,
            {
                test: /\.(css|less|jsx?)$/,
                loader: StringReplacePlugin.replace({
                    replacements: [
                        {
                            pattern: /\d+?px['"; ]/ig,
                            replacement: function (res) {
                                // 若cssmode为0, 则不需要额处理单位
                                // 可选: 640 | 750
                                if (cssmode > 0) {
                                    res = res.replace(/(\d+?)px([; ',"])/ig, function($1 , $2 , $3, index , source) {
                                        return ($2 * 2) / (cssmode / 10) + 'rem' + $3;
                                    });
                                }
                                return res;
                            }
                        }
                    ]
                })
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=300" // 小于3k, 转成base64
            },
            {
                test: /\.jpg|eot|ttf|woff|mp3|mp4|gif$/,
                loader: "file-loader"
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'], // 确保引用时省略模块扩展名
        alias:{
            '@': path.resolve(__dirname, './js'),
        }
    },
    externals: {
        echarts: 'echarts',
        moment: 'moment'
    },
    // server配置
    // sudo webpack-dev-server
    devServer: {
        historyApiFallback: true,//不跳转
        contentBase: './',  // 服务根目录
        color: true,  // 命令行是否彩色
        inline: true, // 项目文件保存自动编译文件模块
        host: '0.0.0.0',
        disableHostCheck: true,
        port: 80 // 启动端口
    },

    // 插件
    plugins: [
        // 如果更改顺序记得把 scripts/util.js 对应html模板 判断改了
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './template/index-ace.html',
            hash: true,
            // 指定要加载的模块
            chunks: ['vendor', 'webapp']
        }),
        extractCSS,
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false,
            }
        }),
        new StringReplacePlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js',
            minChunks: function(module) {
              let flag =  module.context && module.context.indexOf('node_modules') !== -1;
            //   console.log(module.context, flag);
              return flag;
            }
        }),
        new webpack.ProgressPlugin((percentage, message, ...args) => {
            // e.g. Output each progress message directly to the console:
            let str = '';
            if(percentage === 1) {
                str = '打包完成 \n';
            } else {
                _percent = (percentage * 100).toFixed(2);
                str = `打包进度: ${_percent}%`;
                if(message === 'building modules') {
                    str += `      ${args[0]} \n`;
                } else {
                    str += `      正在进行 => ${message} \n`;
                }

            }
            singleLog(str);
        })
]
};

module.exports = config;
