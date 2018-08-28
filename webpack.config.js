var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');  // 导出额外的文件插件
var StringReplacePlugin = require('string-replace-webpack-plugin'); // 字符串替换插件
// var CopyWebpackPlugin = require('copy-webpack-plugin');

// 获取环境变量, 方便做不同处理
// stage, product打包处理方式略有不同, 如assets资源的引用路径
var env = process.env.NODE_ENV;

// 读取项目配置文件
// 获得项目名称及版本, 方便做打包处理assets cdn路径
var package = require('./package.json');
var projectVersion = package.version;
var projectName = package.name;
var cssmode = package.cssmode;
var gitlabGroup = package.gitlabGroup;
var cdnDomain = package.cdnDomain;

function resolve (dir) {
    return path.join(__dirname, './', dir)
}

const extractCSS = new ExtractTextPlugin({
    allChunks: true,
    filename: '[name].css'
});

// 输出口
var output = {
    path: path.resolve(__dirname, "build/assets"),
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash:5].chunk.js'
};

// 声明cssloader
var cssLoader = {
    test: /\.(css|less)$/,
    use: [
        'style-loader',
        'css-loader?minimize=true',
        'postcss-loader',
        'less-loader'
    ]
}

// 为product环境打包时
if (env == 'product') {
    // 定制cdn路径
    output.publicPath = 'https://' + cdnDomain + '/' + gitlabGroup + '/' + projectName + '/' + projectVersion + '/assets/';
    cssLoader.loader = extractCSS.extract(['css-loader', 'postcss-loader', 'less-loader']);
    delete cssLoader.use;
}

if (env == 'stage') {
     // 定制cdn路径
    output.publicPath = '/' + gitlabGroup + '/' + projectName + '/' + projectVersion + '/assets/';
    cssLoader.loader = extractCSS.extract(['css-loader', 'postcss-loader', 'less-loader']);
    delete cssLoader.use;
}

var config = {
    entry: {
        // 可对应多个入口文件
        webapp: ['./js/app.js'],
        test: ['./js/test.js'],
        vendor: ['react', 'react-dom', 'react-router', 'mobx-react']
    },
    output: output,
    devtool: 'source-map', // 输出source-map
    module: {
        loaders: [
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
                test: /\.css|less|jsx?$/,
                loader: StringReplacePlugin.replace({
                    replacements: [
                        {
                            pattern: /\d+?px[; ',"]/ig,
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
                loader: "url-loader?limit=6000" // 小于3k, 转成base64
            },
            {
                test: /\.jpg|mp3|mp4|gif$/,
                loader: "file-loader"
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'], // 确保引用时省略模块扩展名
        alias:{
            '@': resolve('js')
        }
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
        extractCSS,
        new StringReplacePlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor']
        })
    ]

};


module.exports = config;
