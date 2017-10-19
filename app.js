// expressを読み込み
var express = require("express");
var request = require('sync-request');
var app = express();

app.set('view engine', 'ejs');

// サーバーの設定
var server = app.listen(process.env.PORT || 5000);

app.get("/", function(req, res, next){ //追加
  res.render('index.ejs', {text: 'こんにちは'}); //追加
}); //追加

function getMessageText(text) {
  var message = 'こんにちは'; //追加
  if(text.indexOf("モンスト")>=0){
      return='STEART'
  }
  else if(text.indexOf("ヤマトタケル")>=0){
    return'いざ、天下無双の件、ストライクショット！'
  }
  else if(text.indexOf("ノア")>=0){
    return'新しい世界が、ここから始まる'
  }
  else if(text.indexOf("パンドラ")>=0){
    return 'アッチャー。箱、開いちゃったドラ'
  }
  else if(text.indexOf("イザナミ")>=0){
    return'敵を穿て、ストライクショット！'
  }
  else if(text.indexOf("ワールド")>=0){
   return'世界よ、我が前に跪け'
  }
  else if(text.indexOf("黄泉")>=0){
   return'僕が命じる。黄泉軍よ・・・滅ぼせ'
  }
  else if(text.indexOf("ルシュファー")>=0){
   return'我、堕天の王なり！'
 }
  else if(text.indexOf("ゼウス")>=0){
   return'雷帝よ、天を揺るがせ！これが全能の力よ！'
 }
   else if(text.indexOf("ツクヨミ")>=0){
  　return'ストライクショット！闇を照らす光あれ'
}
  else if(text.indexOf("エルドラド")>=0){
  return'予告どおり、黄金はすべていただいた！！'
}
else if(text.indexOf("スサノオ")>=0){
return'荒ぶる魂よ！海を割り・・・大地を砕け！'
}
else if(text.indexOf("ラファエル")>=0){
return'聖なる水よ、今ここにその軌跡を示したまへ'
}
else if(text.indexOf("オーディン")>=0){
return'グングニルよ、我が魔力を持って殲滅せよ'
}
else if(text.indexOf("アリス")>=0){
return'ねぇ、蜂の巣にしても良いかな？良いよね？'
}
else if(text.indexOf("クシナダ")>=0){
return'踊り狂っちゃえ～！ストライクショット！'
}else {
    message=apiAccessSample(text);
    return message;
  }
}
app.get("/hello", function(req, res, next){

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


// TIPS
//改行したい => \n を挿入

function randomSample() {
  //乱数を発生させ、0,1,2の3パターンをランダムに返すサンプル
  var min = 0;
  var max = 2 ;
  var r = Math.floor( Math.random() * (max + 1 - min) ) + min ;
  switch (r){
  case 0:
    return "夏目といえば夏目漱石ですよね";
  case 1:
    return "夏目といえば夏目三久ですよね";
  case 2:
    return "夏目といえば夏目友人帳ですよね";
  }
}

function timeSample() {
  //時間を取得するサンプルです。
  // こういうところで確認してみよう
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date
  var date = new Date(); //現在の日付を取得
  var year = date.getFullYear(); //年を取得
  var hour = date.getHours(); // 0-23時
  return '年は' + year + '年, 時間は' + hour + '時です';
}

function replyImageSample() {
  //画像を送信するサンプルです
  return client.replyMessage(event.replyToken, {
    type: 'image',
    originalContentUrl: "http://www.odakasangyogijutsu-h.fks.ed.jp/?action=common_download_main&upload_id=23",
    previewImageUrl: "http://www.odakasangyogijutsu-h.fks.ed.jp/?action=common_download_main&upload_id=23"
  });
}

function apiAccessSample(text) {
  var phrase = text;
  var list = _getPhraseFromKotohaAPI(phrase);
  var message = '';
  list.forEach(function(l) {
    var tags = '';
    l.tag_list.forEach(function(t) {
        tags += '#' + t + '';
    });
    message += l.text + tags + '\n';
  });
  return message;
}
function _getPhraseFromKotohaAPI(phrase) {
  // 僕の友人がつくっているchrome拡張プラグイン「kotoha」のサーバーから、キーワードに応じて
  // 名言をレスポンスしてくれるサンプル
  var url = 'https://kotoha-server.herokuapp.com/api/phrases.json?text=' + encodeURIComponent(phrase);
    var response = request(
      'GET',
      url
    );
    console.log(JSON.parse(response.body)); //JSONというフォーマットを変換
    return JSON.parse(response.body) || [];
}
