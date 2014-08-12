var app = require('koa')();
var common = require('koa-common');

app.use(common.logger('dev'));

app.use(common.static(__dirname + '/public'));

app.use(function *() {
  this.body = "Hello World";
});

var server = app.listen(4000, function () {
  console.log('Listening on port %d', server.address().port);
});
