'use strict';

var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();

var app = require('./app');

var server = app.listen(appEnv.port, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
