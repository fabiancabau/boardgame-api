module.exports = function(app) {
	
	var Match = require('../models/match');
	var MatchInvite = require('../models/matchInvite')

	var isAuthenticated = require('../middlewares/auth');
	
	app.get('/matches', isAuthenticated, function(req, res) {
		Match.find({}).populate('users')
			.then(function(matches) {
				res.json(matches);
			}, function(err) {
				console.log(err);
			})
	})

	/* ADD match */
	app.post('/matches', isAuthenticated, function(req, res) {
		var newMatch = new Match(req.body);

		console.log(req.user);

		console.log(req.body);
		newMatch.save(function(err, match) {
			if(err) {
				res.status(500).json(err);
				console.log(err);
			}
			res.json(match);
			console.log(match);
		})
	})

	/* ADD user to match */
	app.post('/match/:id/user', isAuthenticated, function(req, res) {
		Match.findById(req.params.id).exec(function(err, match) {
			match.users.push(req.body.userId);

			match.save(function(err, match) {
				if(err) {
					res.status(500).json(err);
					console.log(err);
				}
				match.populate('users', function(err) {
					res.json(match);
					console.log(match);
				})
			})
		})
	})

	/* Send match invitation to one user */
	app.post('/match/:id/invite', isAuthenticated, function(req, res) {
		
		match_invite = new MatchInvite(req.body);
		match_invite.match_owner = req.user._doc._id;
		match_invite.match_id = req.params.id;

		match_invite.save(function(err, invite) {
			if (err) {
				res.status(500).json(err);
				console.log(err);
			}

			res.status(201).json(invite);
		});

	})


	/* Change Invitation Status */
	app.put('/match/:id/invite/:inviteId', isAuthenticated, function(req, res) {
		
		MatchInvite.findById(req.params.inviteId).exec(function(err, invite) {
			invite.status = req.body.status;
			invite.dt_response = new Date();

			invite.save(function(err, invite) {
				if (err) {
					res.status(400).json(err);
				}

				//If user accepts the match, insert them into it
				if (invite.status === 1) {
					Match.findById(req.params.id).exec(function(err, match){

						//TODO: Check if this user isn't already in the array
						match.users.push(invite.user_invited);

						match.save(function(err, matchUpdate) {
							if (err) {
								res.json(err);
							}

							res.status(200).json({invite: invite, match: matchUpdate});
						})
					});
				}
			});
		})
	})




	
	
}