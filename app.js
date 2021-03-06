require('babel-polyfill');
require('babel-core/register')({
	presets: ['es2015']
});

var config = require('config');
var app = require('koa')();
var router = require('./router');
require('./db')();

app.keys = config.app.keys;
app.proxy = true;

app.use(require('koa-logger')());
app.use(require('koa-compress')());
app.use(require('koa-static-cache')('./public', {
	maxAge: config.app.cacheAge
}));
app.use(require('koa-views')(__dirname + '/views', {
	extension: 'jade'
}));

app.use(router.routes(), router.allowedMethods());

module.exports = app;
