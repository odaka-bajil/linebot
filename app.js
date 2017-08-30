// expressを読み込み
var express = require("express");
var app = express();

app.set('view engine', 'ejs');

// サーバーの設定
var server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

app.get("/", function(req, res, next){ //追加
    res.render('index.ejs', {text: 'こんにちは'}); //追加
}); //追加

app.get("/hello", function(req, res, next){
  var message = 'こんにちは'; //追加
var hour = new Date().getHours();
  if(req.query.text.indexOf("斉藤 ")>=0) {
    message = '齊藤さんだぞっ';
  } else if(req.query.text.indexOf('斉藤')>=0|| 
            req.query.text.indexOf('斉藤')>=0||
            req.query.text.indexOf('斉藤')>=0){
    message = '漢字が違うぞ';
  }else{
message='ぜんぜん違うぞっ';
}
message+='\n「'+req.query.text+'」といいましたか？'
  res.json(message); //'こんばんは'をmessageに書き換え
});

