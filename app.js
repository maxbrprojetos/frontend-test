var app    = require('koa')(),
    common = require('koa-common');

app.use(common.static(__dirname + '/public'));

var server = app.listen(8000, function () {
  console.log(' ➜  Listening on localhost:%d', server.address().port);
});
