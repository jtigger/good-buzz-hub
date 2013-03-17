/**
 *
 */

var twitterSteps = module.exports = function() {
  this.World = require('../support/world').World;

  this.Given(/^the coach has not authorized GBH on Twitter$/, function(callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.When(/^the coach authorizes GBH on Twitter$/, function(callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.Then(/^GBH creates a spoke to represent the coach on Twitter$/, function(callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.Then(/^that spoke contains the authorization token from Twitter$/, function(callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });
};