const webpack = require('webpack');
const webpackConfig = require('../webpack.config.prod');
const Chalk = require('chalk');

const {getWebpackConfig} = require('./util.js');
const {stampUpdate} = require('./lang/util.js');

let {app_version, config} = getWebpackConfig(process.argv, webpackConfig);
let strColor = app_version === 'aus' ?  Chalk.blue : Chalk.yellow;

console.log(strColor(`${app_version} 开始构建`));

webpack(config, function(err, stats) {
    console.log(strColor(`${app_version} 构建完成`));
    if (err) throw err;
    process.stdout.write(
        stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n'
    );
    console.log(strColor(`${app_version} 更新多语言时间戳`));
    stampUpdate(`./build/${app_version}/index.html`, new Date().getTime()).then(res => {
        console.log(Chalk[res.status ? 'green' : 'red' ]('ace ' + res.message));
    });
});
