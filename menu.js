'use strict'
var WechatAPI = require('wechat-api');

var appid = 'wxb55fb4b8619418a4';
var appsecret = 'cf7f9b1bebc3f017c19fecd85195a0ec';

var menu = {
  "button": [{
    "type": "view",
    "name": "魔兽新闻",
    "url": "http://m.wow.tgbus.com/"
  }, {
    "name": "小游戏",
    "sub_button": [{
      "type": "view",
      "name": "卡牌MT",
      "url": "http://www.myriptide.com/tgwow/h5game/MT/"
    }, {
      "type": "view",
      "name": "棍子大侠",
      "url": "http://wow.tgbus.com/special/h5game/"
    }, {
      "type": "click",
      "name": "小游戏排行榜",
      "key": "score"
    }]
  }, {
    "type": "click",
    "name": "帮助",
    "key": "help"
  }]
};

var api = new WechatAPI(appid, appsecret);
api.createMenu(menu, function(err, result) {
  if (!err) {
    console.log(result)
  } else {
    console.log(err)
  }
})