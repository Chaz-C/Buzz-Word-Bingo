// jshint esversion: 6
const express = require('express');
let app = express();


let server = app.listen(3000, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log('Server listening on', host, port);
});