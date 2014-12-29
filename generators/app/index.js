'use strict';

var async = require('async');
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
      'Welcome to the tiptop ND project generator!'
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
        name: 'version',
        message: '版本号？',
        default: '0.0.0'
      },
      {
        type: 'input',
        name: 'description',
        message: '项目简介？',
        default: this.description
      }
    ];

    this.prompt(prompts, function(answers) {
      this.appname = answers.appname.replace(/\s/g, '-');
      this.version = answers.version;
      this.description = answers.description.replace(/([\\\"])/g, '\\$1');

      this.user = user(this);
      this.time = time();

      done();
    }.bind(this));
  },

  writing: {

    app: function() {
      this.directory('app', 'app');
      this.directory('lib', 'lib');
      this.directory('mod', 'mod');
      this.directory('theme', 'theme');

      this.template('_Gruntfile.js', 'Gruntfile.js');
      this.template('_HISTORY.md', 'HISTORY.md');
      this.template('_package.json', 'package.json');
      this.template('_README.md', 'README.md');

      this.src.copy('_config.rb', 'config.rb');
      this.src.copy('_editorconfig', '.editorconfig');
      this.src.copy('_gitignore', '.gitignore');
      this.src.copy('_jshintrc', '.jshintrc');
    }

  },

  end: function() {
    var that = this;

    function handleFolder(dest, folderDone) {
      dest = path.join(that.destinationRoot(), dest);

      function handleFile(file, fileDone) {
        file = path.join(dest, file);

        fs.unlink(file, function() {
          that.log.info(path.relative(process.cwd(), file), 'cleared!');
          fileDone();
        });
      }

      var files = that.expandFiles('**', { dot: true, cwd: dest })
        // filter
        .filter(function(file) {
          return /\.(git|npm)ignore$/.test(file);
        });

      async.each(files, handleFile, function(err) {
        if (err) {
          that.log.error(err);
        }

        folderDone();
      });
    }

    that.log.info('Cleaning temporary files ...');
    async.each(['app', 'lib', 'mod', 'theme'], handleFolder, function(err) {
      if (err) {
        that.log.error(err);
      }

      that.log();
      that.log.ok('万事俱备，只欠 `npm/spm install`。');
    });
  }
});
