var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var matchSchema = new Schema({
	dt_created : {type: Date, default: Date.now },
	name : String,
	userId : {
			type: Schema.Types.ObjectId,
			ref: 'User'
	},
	users : [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}]
})
module.exports = mongoose.model('Match', matchSchema);



