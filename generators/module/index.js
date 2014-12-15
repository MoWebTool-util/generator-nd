'use strict';

var fs = require('fs');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var user = require('../../lib/user.js');
var time = require('../../lib/time.js');

module.exports = yeoman.generators.Base.extend({

  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the tiptop ND module generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'appname',
        message: '模块名？',
        default: this.appname
      },
      {
        type: 'input',
        name: 'version',
        message: '版本号？',
        default: '0.0.0'
      },
      {
        type: 'input',
        name: 'description',
        message: '模块简介？',
        default: this.description
      }
    ];

    this.prompt(prompts, function(answers) {
      this.appname = answers.appname.replace(/\s/g, '-');
      this.varname = answers.appname.replace(/\s(\w)/g, function($0, $1) {
        return $1.toUpperCase();
      });
      this.version = answers.version;
      this.description = answers.description;

      this.user = user();
      this.time = time();

      done();
    }.bind(this));
  },

  writing: {

    app: function() {
      this.directory('examples', 'examples');
      this.directory('tests', 'tests');

      this.template('_Gruntfile.js', 'Gruntfile.js');
      this.template('_HISTORY.md', 'HISTORY.md');
      this.template('_index.js', 'index.js');
      this.template('_package.json', 'package.json');
      this.template('_README.md', 'README.md');

      this.src.copy('_config.rb', 'config.rb');
      this.src.copy('_editorconfig', '.editorconfig');
      this.src.copy('_gitignore', '.gitignore');
      this.src.copy('_jshintrc', '.jshintrc');
      this.src.copy('_spmignore', '.spmignore');
      this.src.copy('_travis.yml', '.travis.yml');
    }

  }

});
