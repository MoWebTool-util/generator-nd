/**
 * Description: Gruntfile.js
 * Author: <%= user.name %> <<%= user.email %>>
 * Date: <%= time %>
 */

'use strict';

module.exports = function(grunt) {

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    server: {
      develop: {
        options: {
          config: false,
          release: false
        }
      }
    },

    jsdoc: {
      api: {
        src: ['index.js', 'src/**/*.js'],
        options: {
          destination: 'doc'
        }
      }
    },

    jshint: {
      files: ['index.js', 'src/**/*.js'],
      options: {
        jshintrc: true
      }
    },

    exec: {
      'spm-publish': 'spm publish',
      'spm-test': 'spm test'
    }

  });

  grunt.registerTask('doc', ['jsdoc']);
  grunt.registerTask('test', ['jshint', 'exec:spm-test']);
  grunt.registerTask('publish', ['test', 'exec:spm-publish']);
  grunt.registerTask('default', ['server']);

};
