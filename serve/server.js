#!/usr/bin/env node

var express = require('express');
var compression = require('compression');
var history = require('connect-history-api-fallback');

var port =  process.env.PORT || 3000;
const app_version = process.env.version || 'ace';

var app = express();

app.use(compression());
app.use(history()); // 页面刷新的时候不至于404


// static
app.use('/static', express.static('static'));
app.use('/images', express.static('images'));
app.use(express.static(`build/${app_version}`));

console.log('> Starting server...');

var server = app.listen(port, function () {
    console.log('Listening >>  http://localhost:'+ port + '/' + '\n')
});
