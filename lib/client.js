var oauth = require('oauth');
var sha1 = require('./sha1');
var prefix = 'https://api.develop.moreapp.com/api/v1.0';
var salt = 'testSalt';
var Promise = require('promise');

function prepareClient(credentials) {
  var hash = makeHash(salt, credentials.password);
  return new oauth.OAuth(null, null, credentials.username, hash, '1.0', null, 'HMAC-SHA1');
}

//Function to salt the password and hash the password using a SHA-1
function makeHash(salt, secret) {
  return sha1.hex_sha1(
      salt.substr(0, Math.ceil(salt.length / 2)) +
      secret +
      salt.substr(Math.ceil(salt.length / 2))
  );
}

module.exports = {
  get : function (credentials, path) {
    return new Promise(function (accept, reject) {
      var client = prepareClient(credentials);
      console.log("GET", path);
      client.get(prefix + path, null, null, function (error, data, res) {
        if (error) {
          console.log("Failed to execute GET on path: " + path + ". ", error);
          reject(error);
          return;
        }

        accept(JSON.parse(data));
      });
    });
  },
  post : function (credentials, path, payload) {
    return new Promise(function (accept, reject) {
      var client = prepareClient(credentials);
      console.log("POST", path);
      client.post(prefix + path, null, null, JSON.stringify(payload), 'application/json', function (error, data, res) {
        if (error) {
          console.log("Failed to execute POST on path: " + path + ". ", error);
          reject(error);
          return;
        }

        accept(data ? JSON.parse(data) : null);
      });
    });
  },
  put : function (credentials, path) {
    return new Promise(function (accept, reject) {
      var client = prepareClient(credentials);
      console.log("PUT", path);
      client.put(prefix + path, null, null, null, 'application/json', function (error, data, res) {
        if (error) {
          console.log("Failed to execute PUT on path: " + path + ". ", error);
          reject(error);
          return;
        }

        accept();
      });
    });
  }
};
