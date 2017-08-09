const express = require('express');
const ngrok = require('ngrok');
const bodyParser = require('body-parser');
const app = express();
const say = require('say');
const serverPort = 3030;

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
app.use(bodyParser.json());
app.use(allowCrossDomain);

app.get('/health', (req, res) => {
  console.log('Looking Good!!!');
});

app.post('/speak', (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const text = req.body.text;
  if (text) {
    res.header('Access-Control-Allow-Origin', "*");
    say.speak(text);
    res.sendStatus(200);
  } else {
    res.header('Access-Control-Allow-Origin', "*");
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


