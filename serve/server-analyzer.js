#!/usr/bin/env node

var express = require('express');
var compression = require('compression');
var webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    history = require('connect-history-api-fallback'),
    webpackDevConfig = require('../webpack.config.js');

const {getWebpackConfig} = require('../scripts/util.js');

// 判断版本 aus|ace
let {config} = getWebpackConfig(process.argv, webpackDevConfig);

var port =  process.env.PORT || 3000;
var compiler = webpack(config);
var app = express();

app.use(compression());
app.use(history()); // 页面刷新的时候不至于404

app.use(webpackDevMiddleware(compiler, {
    // public path should be the same with webpack config
    publicPath: config.output.publicPath,
    quiet: true
}));

// static
app.use('/static', express.static('static'));
app.use('/images', express.static('images'));

app.use(webpackHotMiddleware(compiler));

console.log('> Starting server...');

var server = app.listen(port, function () {
    console.log('Listening >>  http://localhost:'+ port + '/' + '\n')
});
