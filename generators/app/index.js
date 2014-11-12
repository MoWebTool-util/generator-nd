'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var NdGenerator = yeoman.generators.Base.extend({

  initializing: function() {
    this.pkg = require('../../package.json');
  },

  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the tiptop ND generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'appname',
        message: '项目名？',
        default: this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: '项目简介？',
        default: this.description
      }
    ];

    this.prompt(prompts, function(answers) {
      this.appname = answers.appname;
      this.description = answers.description;

      done();
    }.bind(this));
  },

  writing: {

    app: function() {
      this.directory('cfg', 'cfg');
      this.directory('src', 'src');
      this.directory('dist', 'dist');

      this.template('_package.json', 'package.json');
      this.template('_README.md', 'README.md');
    },

    projectfiles: function() {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('gitignore', '.gitignore');
      this.src.copy('jshintrc', '.jshintrc');
    }

  },

  // remove temporary files
  _clear: function(destination) {
    destination = this.isPathAbsolute(destination) ? destination : path.join(this.destinationRoot(), destination);

    var files = this.expandFiles('**', { dot: true, cwd: destination });

    var self = this;

    files.filter(function(file) {
      return /\.gitignore$/.test(file);
    }).forEach(function(file) {
      fs.unlink(path.join(destination, file), function() {
        self.log.info(file);
      });
    });
  },

  end: function() {
    this.log('\n删除临时文件：');

    this._clear('cfg');
    this._clear('src');
    this._clear('dist');
  }
});

module.exports = NdGenerator;
