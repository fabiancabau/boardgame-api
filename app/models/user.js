var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var User = new Schema({
	name : String,
	login : String,
	password : String,
	onesignal_id: String,
	friends : [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}]
});

module.exports = mongoose.model('User', User);