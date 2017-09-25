// expressを読み込み
var express = require("express");
var app = express();

app.set('view engine', 'ejs');

// サーバーの設定
var server = app.listen(process.env.PORT || 5000);

app.get("/", function(req, res, next){ //追加
  res.render('index.ejs', {text: 'こんにちは'}); //追加
}); //追加

function getMessageText(text) {
  var message = '「' + text + '」といいましたか？';
  return message;
}

app.get("/hello", function(req, res, next){
  var message = 'こんにちは'; //追加
  // var hour = new Date().getHours();
  // if(req.query.text.indexOf("斉藤 ")>=0) {
  //   message = '齊藤さんだぞっ';
  // } else if(req.query.text.indexOf('斉藤')>=0||
  // req.query.text.indexOf('斉藤')>=0||
  // req.query.text.indexOf('斉藤')>=0){
  //   message = '漢字が違うぞ';
  // }else{
  //   message='ぜんぜん違うぞっ';
  // }
  message = getMessageText(req.query.text);
  res.json(message); //'こんばんは'をmessageに書き換え
});


const line = require('@line/bot-sdk');
const config = {
  channelAccessToken: 'eoWLyyR1pE/3g5EYPiAXGlj630QTUTfLvNk3lUxJEDNhnU/7y+W0HPpfGgLIbo+Ib05bV2DveuAsbH06BL2cEx5+0cdUHhNj0Pdb3mpS1qTftDdHXcFaOUJY4k+mDK7OmezmAbwaipU71zq5h/0jegdB04t89/1O/w1cDnyilFU=',
  channelSecret: '4ff280de52380d648afc2489340401ab'
};

app.post('/line', line.middleware(config), function(req, res) {
  Promise
  .all(req.body.events.map(handleEvent))
  .then(function(result) {
    res.json(result)
  });
});

const client = new line.Client(config);
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }
  var message = getMessageText(event.message.text);
  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: message
  });
}
