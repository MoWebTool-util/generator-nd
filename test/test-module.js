'use strict';

/*global describe, before, it*/

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('nd:module', function () {

  describe('all defaults', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/module'))
        .inDir(path.join(os.tmpdir(), './temp-test-module'))
        .on('end', done);
    });

    it('creates files', function () {
      assert.file([
        'examples',
        'tests',
        '.editorconfig',
        '.gitignore',
        '.jshintrc',
        '.travis.yml',
        'config.rb',
        'Gruntfile.js',
        'HISTORY.md',
        'index.js',
        'package.json',
        'README.md'
      ]);

      assert.fileContent([
        ['package.json', /"name": "temp-test-module"/],
        ['package.json', /"version": "0\.0\.0"/]
      ]);
    });
  });

  describe('with name and version', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/module'))
        .inDir(path.join(os.tmpdir(), './temp-test-module-2'))
        .withPrompt({
          appname: 'test',
          version: '0.0.1'
        })
        .on('end', done);
    });

    it('creates files', function () {
      assert.file([
        'examples',
        'tests',
        '.editorconfig',
        '.gitignore',
        '.jshintrc',
        '.travis.yml',
        'config.rb',
        'Gruntfile.js',
        'HISTORY.md',
        'index.js',
        'package.json',
        'README.md'
      ]);

      assert.fileContent([
        ['package.json', /"name": "test"/],
        ['package.json', /"version": "0\.0\.1"/]
      ]);
    });
  });

});
