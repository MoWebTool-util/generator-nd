/**
 * Description: Gruntfile.js
 * Author: <%= user.name %> <<%= user.email %>>
 * Date: <%= time %>
 */

module.exports = function(grunt) {

  'use strict';

  function parseAlias(prefix) {
    var fs = require('fs');
    var path = require('path');

    var root = 'spm_modules';

    var alias = [];

    fs.readdirSync(root).forEach(function(dest) {
      var version = fs.readdirSync(path.join(root, dest))[0];
      var spmmain = fs.readFileSync(path.join(root, dest, version, 'package.json'));

      // 移除多余的 `./`
      spmmain = JSON.parse(spmmain).spm.main.replace(/^\.\//, '');

      alias.push('\'' + dest + '\': \'' + prefix + '/' + root + '/' + dest + '/' + version + '/' + spmmain + '\'');
    });

    return alias.join(',\n      ');
  }

  // 显示任务执行时间
  require('time-grunt')(grunt);

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({

    pkg: pkg,

    'cmd-wrap': {
      proxy: {
        dest: '',
        port: 8000,
        pref: '/static'
      }
    },

    jshint: {
      options: {
        jshintrc: true
      },
      app: {
        files: ['app/**/*.js']
      },
      mod: {
        files: ['mod/**/*.js']
      }
    },

    jsdoc : {
      app : {
        src: ['app/**/*.js'],
        options: {
          destination: 'doc/app'
        }
      },
      mod : {
        src: ['mod/**/*.js'],
        options: {
          destination: 'doc/mod'
        }
      }
    },

    exec: {
      'spm-build': 'spm build'
    },

    sass: {
      themes: {
        options: {
          // nested, compact, compressed, expanded
          style: 'compressed'
        },
        files: [{
          expand: true,
          cwd: 'themes/scss',
          src: ['**/*.scss'],
          dest: 'themes/css',
          ext: '.css'
        }]
      }
    },

    copy: {
      config: {
        options: {
          process: function (content/*, srcpath*/) {
            return content.replace(/@APPNAME/g, pkg.name)
              .replace(/@VERSION/g, pkg.version)
              .replace(/@ALIAS/g, parseAlias(pkg.name));
          }
        },
        files: [{
          expand: true,
          cwd: 'lib',
          src: ['config.js.tpl'],
          dest: 'lib',
          ext: '.js'
        }]
      }
    },

    uglify: {
      options: {
        // remove HH:MM:ss
        banner: '/*! <%%= pkg.name %> - v<%%= pkg.version %> - <%%= grunt.template.today("yyyymmdd") %> */\n',
        beautify: {
          'ascii_only': true
        },
        compress: {
          'global_defs': {
            'DEBUG': false
          },
          'dead_code': true
        }
      },
      config: {
        files: [{
          expand: true,
          cwd: 'lib',
          src: ['config.js'],
          dest: 'lib',
          ext: '.js'
        }]
      }
    },

    clean: {
      themes: {
        src: ['themes/css']
      }
    }

  });

  grunt.registerTask('build-themes', ['clean', 'sass']);
  grunt.registerTask('build-app', ['exec']);
  grunt.registerTask('build-lib', ['copy', 'uglify']);

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('build', ['build-themes', 'build-app', 'build-lib']);
  grunt.registerTask('doc', ['jsdoc']);

  grunt.registerTask('proxy', ['cmd-wrap']);
  grunt.registerTask('default', ['test', 'build', 'doc']);

};
