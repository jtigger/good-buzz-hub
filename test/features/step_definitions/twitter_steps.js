/**
 *
 */

MockTwitter = function() {
};

MockTwitter.prototype.generateVerificationForAuthorizationRequest = function(auth_request) {
  return "verified.";
};

HubApp = function() {
};

HubApp.prototype.generateTwitterAuthorizationRequest = function() {
};
HubApp.prototype.authenticate = function(bver, credentials, verification) {
};
HubApp.prototype.getSpokeFor = function(full_name) {
  return ({
    isAuthorizedForTwitter : function() {
      return false;
    }
  });
};

var twitterSteps = module.exports = function() {
  this.World = require('../support/world').World;

  this.Given(/^the BVer has not authorized GBH on Twitter$/, function(callback) {
    this.twitter = new MockTwitter();
    this.hubApp = new HubApp();
    callback();
  });

  this.When(/^the BVer authorizes GBH on Twitter$/, function(callback) {
    var bver = {
      first_name: "Howard",
      last_name: "Sublett"
    };
    var credentials = {
      twitter_user_id: "1241259235",
      twitter_screen_name: "leader-in-flux",
      twitter_access_token_key: "asfasdfasdf",
      twitter_access_token_secret: "avxoiaoinadf"
    };

    var auth_request = this.hubApp.generateTwitterAuthorizationRequest();
    var verification = this.twitter.generateVerificationForAuthorizationRequest(auth_request);
    var authorization = this.hubApp.authenticate(bver, credentials, verification);

    this.authorization = authorization;
    callback();
  });

  this.Then(/^GBH creates a spoke to represent the BVer on Twitter$/, function(callback) {
    this.spoke = this.hubApp.getSpokeFor("Howard Sublett");

    this.spoke.should.have.property('bver');

    callback();
  });

  this.Then(/^that spoke contains the authorization token from Twitter$/, function(callback) {
//    spoke.isAuthorizedForTwitter().should.be.true;
    callback.pending();
  });
};