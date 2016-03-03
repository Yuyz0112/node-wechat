'use strict'
var WechatAPI = require('wechat-api');

var appid = 'wxb55fb4b8619418a4';
var appsecret = 'cf7f9b1bebc3f017c19fecd85195a0ec';

function get(openId, callback) {
  var api = new WechatAPI(appid, appsecret);
  api.getUser({openid:openId, lang:'zh_CN'}, function(err, result) {
    if (!err) {
      callback(result)
    } else {
      console.log(err)
    }
  })
}

exports.get = get;