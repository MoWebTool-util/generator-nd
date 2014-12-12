'use strict';

var shell = require('shelljs');

module.exports = function user() {
  var name = shell.exec('git config --get user.name', {
    silent: true
  }).output.trim();

  var email = shell.exec('git config --get user.email', {
    silent: true
  }).output.trim();

  return {
    name: name ? name : process.env.USER,
    email: email
  };
};
