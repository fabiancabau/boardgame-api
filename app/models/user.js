var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var User = new Schema({
	name : String,
	login : String,
	password : String,
	onesignalId: String,
	friends : [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}]
});

module.exports = mongoose.model('User', User);