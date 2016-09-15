var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var invite_status = {
	0 : 'pending',
	1 : 'accepted',
	2 : 'declined'
}

var matchInviteSchema = new Schema({
	dt_created : {type: Date, default: Date.now },
	dt_response : {type: Date, default: null },
	user_invited : {
			type: Schema.Types.ObjectId,
			ref: 'User'
	},
	match_owner : {
			type: Schema.Types.ObjectId,
			ref: 'User'
	},
	match_id : {
		type: Schema.Types.ObjectId,
		ref: 'Match'
	},
	status : {type: Number, default: 0}
})


matchInviteSchema.virtual('status.description').get(function () {
  return invite_status[this.status];
});

module.exports = mongoose.model('MatchInvite', matchInviteSchema);