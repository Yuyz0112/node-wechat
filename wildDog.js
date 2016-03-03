'use strict'

function getScore(ref,callback) {
	var data;
	var resultArray = [];
	ref.orderByValue().once('value', function(snapshot) {

		snapshot.forEach(function(data) {
			if (resultArray.length === 0) {
				resultArray.push({
					'user': data.val().user,
					'score': data.val().score
				})
			} else {
				var hasThis = 0;
				for (var i = 0; i < resultArray.length; i++) {
					if (data.val().user === resultArray[i].user) {
						hasThis = 1;
						if (parseInt(data.val().score) > parseInt(resultArray[i].score)) {
							resultArray[i].score = data.val().score;
						}
					}
				}
				if (!hasThis) {
					resultArray.push({
						'user': data.val().user,
						'score': data.val().score
					})
				}
			}
		})
		resultArray.sort(function(a, b) {
			return b.score - a.score;
		})
		callback(resultArray);
	})
}

exports.getScore = getScore;