#!/usr/bin/env node

var express = require('express');
var webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    history = require('connect-history-api-fallback'),
    webpackDevConfig = require('./webpack.config.prod.js');

var port = 3000;

var compiler = webpack(webpackDevConfig);
var app = express();

app.use(history()); // 页面刷新的时候不至于404

app.use(webpackDevMiddleware(compiler, {
    // public path should be the same with webpack config
    publicPath: webpackDevConfig.output.publicPath,
    quiet: true
}));

app.use(webpackHotMiddleware(compiler));

console.log('> Starting server...');

var server = app.listen(port, function () {
    console.log('Listening >>  http://localhost:'+ port + '/' + '\n')
});