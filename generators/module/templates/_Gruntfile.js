/**
 * Description: Gruntfile.js
 * Author: <%= user.name %> <<%= user.email %>>
 * Date: <%= time %>
 */

'use strict';

module.exports = function(grunt) {

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    server: {
      develop: {
        options: {
          config: false,
          release: false
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

  grunt.registerTask('test', ['jshint','exec:spm-test']);

  grunt.registerTask('publish', ['test', 'exec:spm-publish']);

  grunt.registerTask('default', ['server']);

};
