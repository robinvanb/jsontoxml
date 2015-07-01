var client = require('./client');
var devCredentials = {username : 'ironman+tonystark@moreapps.nl', password : 'test1234'};

module.exports = function (pluginConfig, definition) {

  var createNewPlugin = function () {
    console.log("> Creating new plugin");
    return client.post(devCredentials, '/developers/plugins', {
      namespace : pluginConfig.namespace,
      key : pluginConfig.key,
      name : pluginConfig.name,
      description : null,
      type : "HOOK",
      logo : null,
      kickback : 0
    });
  };

  var createArtifact = function (plugin) {
    return client.get(devCredentials, '/developers/plugins/' + plugin.id + "/artifacts").then(function (artifacts) {
      var filtered = artifacts.filter(function(artifact) {
        return artifact.status == 'SUBMITTED' || artifact.status == 'AWAITING_PACKAGE_UPLOAD';
      });

      //Revoke open artifact
      if (filtered[0]) {
        console.log("> Remove old artifact with version:", filtered[0].version);
        return client.put(devCredentials, '/developers/plugins/' + plugin.id + "/artifacts/" + filtered[0].version + "/revoke");
      }
    }).then(function() {
      console.log("> Creating new artifact");
      return client.post(devCredentials, '/developers/plugins/' + plugin.id + "/artifacts", {})
    }).then(function (artifact) {
      console.log("> Uploading new artifact");
      return client.post(devCredentials, '/developers/plugins/' + plugin.id + '/artifacts/' + artifact.version + '/upload-json', definition).then(function() {
        return {plugin :plugin, artifact :artifact};
      });
    });

  };

  return client.get(devCredentials, '/developers/plugins')
    .then(function (data) {
      var filtered = data.filter(function (plugin) {
        return plugin.namespace == pluginConfig.namespace && plugin.key == pluginConfig.key;
      });

      if (filtered.length == 0) {
        return createNewPlugin();
      } else {
        console.log("> Using existing plugin");
        return filtered[0];
      }
    })
    .then(createArtifact)
    .then(function (result) {
      console.log("> Done Creating Artifact");
      return result;
    });

};