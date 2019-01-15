#!/usr/bin/env node

const file = require('./app/file');
const Chalk = require('chalk');

const {stampUpdate} = require('./lang/util.js');

let res = file.main({
    split: true,
    multi: true
});

if(res) {
    res.then(res => {
        let _stamp = new Date().getTime();
        stampUpdate('./build/ace/index.html', _stamp).then(res => {
            console.log(Chalk.green(res.message));
        });
        stampUpdate('./build/aus/index.html', _stamp).then(res => {
            console.log(Chalk.green(res.message));
        });
    })
}
