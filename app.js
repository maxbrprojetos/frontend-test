var app = require('koa')();
var common = require('koa-common');

app.use(common.static(__dirname + '/public'));

var server = app.listen(8000, function () {
  console.log(' ➜  Listening on localhost:%d', server.address().port);
});
