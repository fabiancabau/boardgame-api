
var headers = {
	"Content-Type": "application/json",
	"Authorization": "Basic ZjIwMjliNmUtM2RlMC00Nzc1LWI4NTYtNjZkY2VhYzNkYTdj"
};

var options = {
	host: "onesignal.com",
	port: 443,
	path: "/api/v1/notifications",
	method: "POST",
	headers: headers
};

var PushNotifications = function () {};

PushNotifications.prototype.sendPushToTarget = function (title, text, target) {

	var message = { 
		app_id: "08b0ff23-22f2-467d-aab1-99dcad042d76",
		contents: {"en": title},
		headings: {"en": text},
		included_player_ids: [target]
		// included_segments
	};

	request.post({
		headers: headers,
		json:    true,
		url:     'https://onesignal.com/api/v1/notifications',
		body:    message
		}, function(error, response, body){
		console.log(response);
	});



};


module.exports = new PushNotifications();
 