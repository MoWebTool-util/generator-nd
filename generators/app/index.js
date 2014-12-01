'use strict';

var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var shell = require('shelljs');

function time() {
  function pad(n) {
    return n < 10 ? '0' + n.toString(10) : n.toString(10);
  }

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
    // this.pkg = require('../../package.json');
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
      this.directory('dist', 'dist');
      this.directory('app', 'app');
      this.directory('lib', 'lib');
      this.directory('mod', 'mod');
      this.directory('themes', 'themes');

      this.template('_Gruntfile.js', 'Gruntfile.js');
      this.template('_package.json', 'package.json');
      this.template('_README.md', 'README.md');
    },

    projectfiles: function() {
      this.src.copy('config.rb', 'config.rb');
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('gitignore', '.gitignore');
      this.src.copy('jshintrc', '.jshintrc');
    }

  },

  end: function() {
    this.log('\n删除临时文件：');

    ['dist', 'app', 'lib', 'mod', 'themes'].forEach(function(dest) {
      var destination = this.isPathAbsolute(dest) ? dest : path.join(this.destinationRoot(), dest);

      this.expandFiles('**', { dot: true, cwd: destination })
        // filter
        .filter(function(file) {
          return /\.(git|npm)ignore$/.test(file);
        }.bind(this))
        // loop
        .forEach(function(file) {
          file = path.join(destination, file);
          fs.unlink(file, function() {
            this.log.info(path.relative(process.cwd(), file));
          }.bind(this));
        }.bind(this));
    }.bind(this));
  }
});
