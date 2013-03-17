Feature: Coaches can manage authorizations
  A BV Coach can authorize and de-authorize GoodBuzzHub to "post" on his/her behalf on Twitter
  so that when it comes time for GBH to spread the word, automatically, it can.

  Scenario: authorizing GBH on Twitter
     Given the BVer has not authorized GBH on Twitter
      When the BVer authorizes GBH on Twitter
      Then GBH creates a spoke to represent the BVer on Twitter
       And that spoke contains the authorization token from Twitter

