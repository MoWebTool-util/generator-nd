/**
 * Description: Gruntfile.js
 * Author: <%= user.name %> <<%= user.email %>>
 * Date: <%= time %>
 */

module.exports = function(grunt) {

  'use strict';

  // 显示任务执行时间
  require('time-grunt')(grunt);

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

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
      'spm-build': 'spm build --include all --ignore $ --idleading dist --output-directory ./'
    },

    sass: {
      themes: {
        options: {
          // nested, compact, compressed, expanded
          style: 'compressed'
        },
        files: [{
          expand: true,
          cwd: 'themes/css',
          src: ['**/*.scss'],
          dest: 'themes/css',
          ext: '.css'
        }]
      }
    },

    copy: {
      config: {
        options: {
          process: function (content, srcpath) {
            return content.replace('@VERSION', '<%= pkg.version %>');
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
      app: {
        files: [{
          expand: true,
          cwd: 'dist/app',
          src: '**/*.js',
          dest: 'dist/app',
          ext: '.js'
        }]
      },
      mod: {
        files: [{
          expand: true,
          cwd: 'dist/mod',
          src: '**/*.js',
          dest: 'dist/mod',
          ext: '.js'
        }]
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
      build: ['.build']
    }

  });

  grunt.registerTask('proxy', [
    'cmd-wrap'
  ]);

  grunt.registerTask('test', [
    'jshint'
  ]);

  grunt.registerTask('build', [
    // 'sass',
    'exec:spm-build'
  ]);

  grunt.registerTask('default', [
    'test',
    'build',
    'copy',
    'uglify',
    'jsdoc',
    'clean'
  ]);
};
