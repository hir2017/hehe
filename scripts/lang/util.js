const fs = require('fs');
const Chalk = require('chalk');
// 时间戳更新
exports.stampUpdate = (path, stamp) => {

    // console.log(path, stamp);
    // 读文件 正则过滤 替换
    return new Promise((resolve, reject) => {
        let html = fs.readFileSync( path, {encoding: 'utf8'}  );
        html = html.toString();
        html = html.replace(/<script.*?\/static\/lang\/app.*?></ig, matchStr => {
            let result = matchStr.replace(/\.js.*?\"/ig, `.js?stamp=${stamp}"`);
            return result;
        })
        fs.writeFile(path, html, 'utf8', err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    }).then(fd => {
        return {status: true, message: '时间戳更新成功'}
    }, err => {
        return {status: false, message: '时间戳更新失败', error: err}
    });
}
// 多语言文件写入
exports.writeF = (path, str) => {
    console.log('多语言导出中...')
    return new Promise((resolve, reject) => {
        // 文件写入
        fs.writeFile(path, str, 'utf8', err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    }).then(
        res => {
            return {
                status: true,
                message: '多语言文件写入完毕'
            };
        },
        err => {
            return {
                status: false,
                message: '多语言文件写入失败',
                error: err
            };
        }
    );
};
// 检测多语言目录是否存在
exports.isExist = (args_path) => {
    return new Promise((resolve, reject) => {
        fs.stat(args_path.root, (err, stats) => {
            if(err) {
                reject(err);
            } else {
                resolve(stats);
            }
        })
    }).then(stats => {
        // console.log('目录存在')
    }, err => {
        // console.log('执行失败', err)
        console.log(Chalk.rgb(123, 45, 67)('static/lang 目录不存在，正在创建'));
        fs.mkdirSync(args_path.root);
    });
}
