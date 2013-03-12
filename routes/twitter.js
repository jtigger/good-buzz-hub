var twitter = require('ntwitter')
  , OAuth = require('../node_modules/ntwitter/node_modules/oauth').OAuth
  , credentials = require('../../credentials.js')

var creds = new credentials().twitter();
var oa = new OAuth(
 	"https://api.twitter.com/oauth/request_token",
 	"https://api.twitter.com/oauth/access_token",
 	creds.consumer_key,
 	creds.consumer_secret,
 	"1.0",
 	"http://localhost:3000/auth/twitter/callback",
 	"HMAC-SHA1"
 );


exports.auth = function(req, res) {
	oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
		if (error) {
			console.log(error);
			res.send("yeah no. didn't work.")
		}
		else {
			req.session.oauth = {};
			req.session.oauth.token = oauth_token;
			console.log('oauth.token: ' + req.session.oauth.token);
			req.session.oauth.token_secret = oauth_token_secret;
			console.log('oauth.token_secret: ' + req.session.oauth.token_secret);
			res.redirect('https://twitter.com/oauth/authenticate?oauth_token='+oauth_token)
	}
	});
};

exports.auth_return = function(req, res, next){
	if (req.session.oauth) {
		req.session.oauth.verifier = req.query.oauth_verifier;
		var oauth = req.session.oauth;

    console.log('oauth = ' + oauth);

		oa.getOAuthAccessToken(oauth.token,oauth.token_secret,oauth.verifier, 
		function(error, oauth_access_token, oauth_access_token_secret, results){
			if (error){
				console.log(error);
				res.send("yeah something broke.");
			} else {
				req.session.oauth.access_token = oauth_access_token;
				req.session.oauth.access_token_secret = oauth_access_token_secret;
				console.log(results);
				var userCreds = { consumer_key : creds.consumer_key, 
				                  consumer_secret : creds.consumer_secret,
				                  access_token_key : oauth_access_token, 
				                  access_token_secret : oauth_access_token_secret };
				                   
				var twit = new twitter(userCreds);
				var now = new Date();
				twit.showStatus(results.user_id, function(err, data) {
          if(err) {
            console.log(err);
            res.send("oops!  Couldn't seem to log into Twitter.  :(");
          } else {
            console.log(data)
    				res.send("worked. nice one.");
          }
				});
        twit.updateStatus('Hello, world. (over SSL)', function(err, data) {
          if(err) {
            console.log(err);
            res.send("oops!  Couldn't seem to log into Twitter.  :(");
          } else {
            console.log(data)
    				res.send("worked. nice one.");
          }
        });
			}
		}
		);
	} else
		next(new Error("you're not supposed to be here."))
};
