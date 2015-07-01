var client = require('./client');

module.exports = function(pluginData) {
  return client.post({username : 'admin1', password:'test1234'},'/admin/plugins/' + pluginData.plugin.id + "/artifacts/" + pluginData.artifact.version + "/accept",{}).then(function() {
    console.log("> Accepted plugin artifact");
  });
};