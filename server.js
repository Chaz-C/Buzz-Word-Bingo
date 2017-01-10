// jshint esversion: 6
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
let app = express();

let allWords = {
  "buzzWords": []
};

let playerScore = 0;

app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/buzzwords', (req, res, next) => {
  res.send(allWords);
});


// app.post('/buzzword', (req, res, next) => {
//     app.use(bodyParser)
// });

app.post('/buzzword', function (req, res, next) {
  allWords.buzzWords.push(req.body);
  res.send('{"success": true}');
});

app.put('/buzzword', function (req, res, next) {
  let allWords = [];
  for ( let i = 0; i < allWords.buzzWords.length; i ++ ) {
    allWords.push(allWords.buzzWords[i].buzzWord);
  }
  let buzzWordIndex = allWords.indexOf(req.body.buzzWord);
  console.log(allWords);
  console.log(buzzWordIndex);
  if ( buzzWordIndex >= 0 && allWords.buzzWords[buzzWordIndex].heard === "false" ) {
    allWords.buzzWords[buzzWordIndex].heard = "true";
    res.send(`{ "success": true,
      newScore: ${playerScore += parseInt(allWords.buzzWords[buzzWordIndex].score)} }`);
  } else {
    res.send('{ "success": false }');
  }
});

app.delete('/buzzword', function (req, res, next) {
  let wordFound = false;
  function deleteWord(element, index, array) {
    if ( element.buzzWord === req.body.buzzWord ) {
      allWords.buzzWords.splice(index, 1);
      wordFound = true;
      return res.send('{ "success": true }');
    }
  }

  allWords.buzzWords.filter(deleteWord);
  if ( wordFound === false ) {
    res.send('{ "success": false }');
  }
});

let server = app.listen(3000, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log('Server listening on', host, port);
});