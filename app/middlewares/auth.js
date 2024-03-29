  var User     = require('../models/user');
  var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
  var config = require('../../config'); // get our config file

  // route middleware to verify a token
  var isAuthenticated = function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['authorization'];

    // decode token
    if (token) {

      // verifies secret and checks exp
      jwt.verify(token, config.secret, function(err, decoded) {      
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
          // if everything is good, save to request for use in other routes
          console.log(decoded);
          req.user = decoded;    
          next();
        }
      });

    } else {

      // if there is no token
      // return an error
      return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
      });
      
    }
  };

module.exports = isAuthenticated;

