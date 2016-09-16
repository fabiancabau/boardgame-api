module.exports = function(app) {
	
	var User = require('../models/user');

	var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
  	var config = require('../../config'); // get our config file


	app.post('/authenticate', function(req, res) {

		console.log(req.body);

        User.findOne({
            login: req.body.login
        }, function(err, user) {

            if (err) throw err;

            if (!user) {
                res.json({success: false, message: 'Auth failed. User not found'});
            }
            else if (user) {

                if (user.password != req.body.password) {
                    res.json({success: false, message: 'Auth failed. Wrong password'});
                }
                else {
                    var token = jwt.sign(user, config.secret, {expiresIn: "7 days"});

                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token,
                        user: user
                    });
                }

            }

        });
    });
    

    /* ADD user */
	app.post('/users', function(req, res) {
		var newUser = new User(req.body);
		newUser.save(function(err, users) {
			if(err) {
				res.status(500).json(err);
				console.log(err);
			}
			res.json(users);
			console.log(users);
		})
	})

}