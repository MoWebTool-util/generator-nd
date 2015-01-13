'use strict';

var pkg = require('../package.json');

require('update-notifier')({
  packageName: pkg.name,
  packageVersion: pkg.version
}).notify({
  defer: false
});
