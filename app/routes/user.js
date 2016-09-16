module.exports = function(app) {
	
	var User = require('../models/user');

	var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
  	var config = require('../../config'); // get our config file

  	var isAuthenticated = require('../middlewares/auth');

	/* GET all users */
	app.get('/users', function(req, res) {
		User.find({}).exec(function(err, users) {
			if(err) {
				res.status(500).json(err);
				console.log(err);
			}
			res.json(users);
			console.log(users);
		})
	})

	/* GET byId user */
	app.get('/user/:id', function(req, res) {
		User.findById(req.params.id).exec(function(err, user) {
			if(err) {
				res.status(500).json(err);
				console.log(err);
			}
			res.json(user);
			console.log(user);
		})
	})


	/* Update user */
	app.put('/user', isAuthenticated, function(req, res) {

		User.findById(req.user._doc._id).exec(function(err, user) {
			if (err) {
				res.status(500).json(err);
			}

			user.name = req.body.name;

			user.save(function(err, userSaved) {
				if (err) {
					res.json(err);
				}

				res.json(userSaved);
			});

		})
	})


	/* Add OneSignal Token to user */
	app.put('/user/push', isAuthenticated, function(req, res) {

		User.findById(req.user._doc._id).exec(function(err, user) {
			if (err) {
				res.status(500).json(err);
			}

			user.onesignalId = req.body.onesignalId;

			user.save(function(err, userSaved) {
				if (err) {
					res.json(err);
				}

				res.json(userSaved);
			});

		})
	})

	/* Add friend        TODO: Unique ID into friends array  */ 
	app.post('/user/friends', isAuthenticated, function(req, res) {

		User.findById(req.user._doc._id).then(function(err, user) {
			if (err) {
				res.status(500).json(err);
			}

			user.friends.push(req.body.friendId);

			user.save(function(err, userSaved) {
				if (err) {
					res.json(err);
				}

				req.user._doc = userSaved;

				res.json(userSaved);
			});

		})
	})


	/* Delete friend    */ 
	app.delete('/user/friends', isAuthenticated, function(req, res) {

		User.findById(req.user._doc._id).then(function(err, user) {
			if (err) {
				res.status(500).json(err);
			}

			user.friends.pull({_id:req.body.friendId});

			user.save(function(err, userSaved) {
				if (err) {
					res.json(err);
				}

				req.user._doc = userSaved;

				res.json(userSaved);
			});

		})
	})




	
}