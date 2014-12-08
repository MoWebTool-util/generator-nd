'use strict';

var fs = require('fs');
var path = require('path');
var shell = require('shelljs');
var spmrc = require('spmrc');
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({

  initializing: function() {
    var spmHome = path.join(spmrc.spmrcfile, '..');
    var tmpHome = path.join(spmHome, 'spm-template');
    var gitUrl = 'git://github.com/crossjs/spm-template.git';
    var gitTodo = 'clone';

    if (fs.existsSync(tmpHome)) {
      // 有 .git
      if (fs.existsSync(path.join(tmpHome, '.git'))) {
        gitTodo = 'update';
      } else {
        // 上级有 .git
        if (fs.existsSync(path.join(tmpHome, '..', '.git'))) {
          gitTodo = 'update';
          shell.exec([
            'cd ' + tmpHome,
            'cd ..',
            'mv -f .git spm-template'
          ].join(' && '), {
            silent: true
          });
        } else {
          shell.exec([
            'rm -rf ' + tmpHome
          ].join(' && '), {
            silent: true
          });
        }
      }
    }

    if (gitTodo === 'update') {
      this.log('\n更新 spm-template ...');
      shell.exec([
        'cd ' + tmpHome,
        'git pull'
      ].join(' && '), {
        silent: true
      });
      this.log('\n更新 spm-template 完成');
    } else if (gitTodo === 'clone') {
      this.log('\n下载 spm-template ...');
      shell.exec([
        'git clone --depth=1 ' + gitUrl + ' ' + tmpHome
      ].join(' && '), {
        silent: true
      });
      this.log('\n下载 spm-template 完成');
    }

    shell.exec([
      'cd ' + tmpHome,
      'mv -f .git ..'
    ].join(' && '), {
      silent: true
    });

    // edit spmrc-3x
    spmrc.set('init.template', tmpHome);

    this.tmpHome = tmpHome;
  },

  writing: {

    app: function() {
      this.spawnCommand('spm', ['init'], { stdio: 'inherit' });
    }

  },

  end: function() {
    var tmpHome = this.tmpHome;
    var travis = path.join(this.destinationRoot(), '.travis.yml');
    var interval = setInterval(function() {
      if (fs.existsSync(travis)) {
        clearInterval(interval);
        shell.exec([
          'cd ' + tmpHome,
          'cd ..',
          'mv -f .git spm-template'
        ].join(' && '), {
          silent: true
        });
      }
    }, 500);
  }

});
