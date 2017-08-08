var express = require('express');
var ngrok = require('ngrok');
var bodyParser = require('body-parser');
var app = express();
var say = require('say');
const serverPort = 3030;

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());

app.get('/health', (req, res) => {
  console.log('Looking Good!!!');
});

app.post('/speak', (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const text = req.body.text;
  if (text) {
    say.speak(text);
  } else {
    res.sendStatus(500);
  }
});

app.listen(serverPort, () => {
  console.log(`Server running on port ${serverPort}`);
  ngrok.connect({
    proto: 'http',
    addr: serverPort,
    subdomain: 'filo'
  }, (err, url) => {
    console.log('curl -X POST -d "text=New incoming chat" ' + url + '/speak');
  });
});


