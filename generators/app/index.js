'use strict';

var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var shell = require('shelljs');

function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}

function time() {
  var now = new Date();
  var d = [pad(now.getFullYear()),
              pad(now.getMonth() + 1),
              pad(now.getDate())].join('-');
  var t = [pad(now.getHours()),
              pad(now.getMinutes()),
              pad(now.getSeconds())].join(':');
  return [d, t].join(' ');
}

function user() {
  var name = shell.exec('git config --get user.name', {
    silent: true
  }).output.trim();

  var email = shell.exec('git config --get user.email', {
    silent: true
  }).output.trim();

  var result = {
    name: name ? name : process.env.USER,
    email: email
  };

  return result;
}

module.exports = yeoman.generators.Base.extend({

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

      this.user = user();
      this.time = time();

      done();
    }.bind(this));
  },

  writing: {

    app: function() {
      this.directory('cfg', 'cfg');
      this.directory('src', 'src');
      this.directory('dist', 'dist');

      this.template('_Gruntfile.js', 'Gruntfile.js');
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

    this.expandFiles('**', { dot: true, cwd: destination })
    // filter
    .filter(function(file) {
      return /\.gitignore$/.test(file);
    }.bind(this))
    // loop
    .forEach(function(file) {
      fs.unlink(path.join(destination, file), function() {
        this.log.info(file);
      }.bind(this));
    }.bind(this));
  },

  end: function() {
    this.log('\n删除临时文件：');

    this._clear('cfg');
    this._clear('src');
    this._clear('dist');
  }
});
