#!/usr/bin/env node

var express = require('express');
var fs = require('fs');
var ReactDOMServer = require('react-dom/server');

var webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    history = require('connect-history-api-fallback'),
    webpackDevConfig = require('./webpack.config.prod.js');

var port =  process.env.PORT || 3000;

var compiler = webpack(webpackDevConfig);
var app = express();

app.use(history()); // 页面刷新的时候不至于404

app.use(webpackDevMiddleware(compiler, {
    // public path should be the same with webpack config
    publicPath: webpackDevConfig.output.publicPath,
    quiet: true
}));

app.use(webpackHotMiddleware(compiler));

function handleRender(req, res) {
  // Renders our Hello component into an HTML string
  const html = ReactDOMServer.renderToString(<Hello />);

  // Load contents of index.html
  fs.readFile('./template/index.html', 'utf8', function (err, data) {
    if (err) throw err;

    // Inserts the rendered React HTML into our main div
    const document = data.replace(/<div id="app"><\/div>/, `<div id="app">${html}</div>`);

    // Sends the response back to the client
    res.send(document);
  });
}

app.get('*', handleRender);

console.log('> Starting server...');

var server = app.listen(port, function () {
    console.log('Listening >>  http://localhost:'+ port + '/' + '\n')
});
