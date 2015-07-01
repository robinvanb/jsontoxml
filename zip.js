var config = require('./config');
var hookDefinition = require('./hook/definition');
var Zip = require('node-zip');

var fs = require("fs");

if (hookDefinition.endpoint.handle) {
  hookDefinition.endpoint.handle = config.tunnel + "/handle";
}
if (hookDefinition.endpoint.test) {
  hookDefinition.endpoint.test = config.tunnel + "/test";
}
var zip = new Zip();
zip.file('definition.json', JSON.stringify(hookDefinition));
var data = zip.generate({base64:false,compression:'DEFLATE'});
fs.writeFileSync('./build/package.zip', data, 'binary');