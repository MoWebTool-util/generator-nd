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

    jshint: {
      options: {
        jshintrc: true
      },
      files: ['src/js/app/**/*.js']
    },

    exec: {
      // spm 只构建 app 目录下的文件
      'spm-build': 'spm build -I src/js/app -O dist/js/app'
    },

    sass: {
      theme: {
        options: {
          // nested, compact, compressed, expanded
          style: 'compressed'
        },
        files: [{
          expand: true,
          cwd: 'src/theme/css',
          src: ['**/*.scss'],
          dest: 'dist/theme/css',
          ext: '.css'
        }]
      }
    },

    copy: {
      config: {
        options: {
          process: function (content, srcpath) {
            return content.replace('@VERSION', '<%%= pkg.version %>');
          },
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: ['config.js'],
          dest: 'dist',
          ext: '.css'
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
          cwd: 'dist/js/app/',
          src: '**/*.js',
          dest: 'dist/js/app/',
          ext: '.js'
        }]
      },
      lib: {
        files: [{
          expand: true,
          cwd: 'dist/js/lib/',
          src: '**/*.js',
          dest: 'dist/js/lib/',
          ext: '.js'
        }]
      },
      config: {
        files: [{
          expand: true,
          cwd: 'dist/js',
          src: 'config.js',
          dest: 'dist/js',
          ext: '.js'
        }]
      }
    },

    clean: {
      build: ['.build']
    }

  });

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('build', ['sass', 'exec:spm-build']);

  grunt.registerTask('default', ['test', 'build', 'copy', 'uglify', 'clean']);
};
