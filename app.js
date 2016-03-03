'use strict'
var wechat = require('wechat');
var express = require('express');
var userGetter = require('./getUser');
var Wilddog = require('wilddog');
var wilddog = require('./wildDog');

var config = {
	token: 'tgbuswow',
	appid: 'wxb55fb4b8619418a4',
	encodingAESKey: '1di4gYDNLjpfPlgGjV8IznQsSSvJRbZmiHvlL7wa7iw'
};

function getStamp(date) {
	var month = date.getMonth() + 1;
	var day = date.getDate();
	date = month + '-' + day;
	return date;
}

var help = `
帮助指南：

回复"查分"，查看当日小游戏分数排行榜。
`

var games = `
回复下列游戏名称之一查看该游戏排行榜：
1.棍子大侠

例：回复“棍子大侠”查看棍子大侠排行榜。
`

var app = express();

app.use(express.query());
app.use('/wechat', wechat(config, function(req, res, next) {
	// 微信输入信息都在req.weixin上
	var message = req.weixin;
	var type = message.MsgType;
	var content = message.Content;
	if (type === 'text') {
		var date = new Date();
		var _date = new Date();
		_date.setTime(date.getTime() - 1000 * 3600 * 24);
		userGetter.get(message.FromUserName, function(userInfo) {
			var user = userInfo.nickname;
			var city = userInfo.city;
			var template = `您好，${user}。
			回复"帮助"查看更多功能介绍。`;
			if (content === '帮助') {
				res.reply(help);
			} else if (content === '查分') {
				res.reply(games);
			} else if (content === '棍子大侠') {
				var ref = new Wilddog('https://tgwow.wilddogio.com/stickScores/' + getStamp(_date));
				wilddog.getScore(ref, function(resultArray) {
					var scoreRank = `回复“今日棍子大侠”查看今日分数排行榜。
					昨日获奖名单：

					`
					for (var i = 0; i < (resultArray.length < 10 ? resultArray.length : 10); i++) {
						scoreRank += resultArray[i].user + '  :  ' + resultArray[i].score + '\r\n';
					}
					res.reply(scoreRank);
				})
			}else if(content === '今日棍子大侠'){
				ref = new Wilddog('https://tgwow.wilddogio.com/stickScores/'+getStamp(date));
				wilddog.getScore(ref,function(resultArray){
					var scoreRank = '今日分数排行榜：'+'\n'
					for (var i = 0; i < (resultArray.length<10? resultArray.length : 10); i++) {
						scoreRank += resultArray[i].user + '  :  ' + resultArray[i].score + '\r\n';
					}
					res.reply(scoreRank);
				})
			} else {
				res.reply(template);
				/*//图文模板
				res.reply([{
					title: '你来我家接我吧',
					description: '这是女神与高富帅之间的对话',
					picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
					url: 'http://nodeapi.cloudfoundry.com/'
				}]);*/
			}
		})
	} else if (type === 'event') {
		if (message.EventKey === 'help') {
			res.reply(help);
		} else if (message.EventKey === 'score') {
			res.reply(games);
		}
	} else {
		res.reply(`您发来的不是一段文本消息，而是一段${type}消息，我会努力学会读懂它的！`);
	}


}))


app.listen(3004);