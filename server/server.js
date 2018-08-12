import express  from 'express';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import history from 'connect-history-api-fallback';
import webpackDevConfig from '../webpack.config.prod.js';
import AppView from '../app';
 
var App = React.createFactory(AppView);
 
var compiler = webpack(webpackDevConfig);
var app = express();

app.use(history()); // 页面刷新的时候不至于404

app.use(webpackDevMiddleware(compiler, {
    // public path should be the same with webpack config
    publicPath: webpackDevConfig.output.publicPath,
    quiet: true
}));

app.use(webpackHotMiddleware(compiler));


app.get('/', function(req, res) {
    var html = ReactDOMServer.renderToStaticMarkup(
        React.DOM.body(
            null,
            React.DOM.div({id: 'root',
                dangerouslySetInnerHTML: {
                    __html: ReactDOMServer.renderToStaticMarkup(App())
                }
            })
        )
    );
 
    res.end(html);
});
 
app.listen(3000, function() {
    console.log('running on port ' + 3000);
});