var config = require('./config');
var hookDefinition = require('./hook/definition');

if (hookDefinition.endpoint.handle) {
  hookDefinition.endpoint.handle = config.tunnel + "/handle";
}
if (hookDefinition.endpoint.test) {
  hookDefinition.endpoint.test = config.tunnel + "/test";
}

var createPlugin = require('./lib/create-plugin');
var approvePlugin = require('./lib/approve-plugin');
createPlugin(config.plugin, hookDefinition)
  .then(function (pluginData) {
    approvePlugin(pluginData);
  });