/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('nd:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        appname: 'test'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'Gruntfile.js',
      'package.json',
      '.editorconfig',
      '.jshintrc'
    ]);
  });
});
