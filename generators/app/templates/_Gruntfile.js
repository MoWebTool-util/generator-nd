module.exports = function(grunt) {

  'use strict';

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    jshint: {
      files: ['src/js/app/**/*.js'],
      options: {
        jshintrc: true
      }
    },

    exec: {
      'spm-build': 'spm build -I src/js/app -O dist/js/app',
      'spm-test': 'spm test'
    },

    sass: {

    },

    copy: {

    },

    uglify: {
      app: {
        files: [
          {
            expand: true,
            cwd: 'dist/js/lib/',
            src: '**/*.js',
            dest: 'dist/js/lib/',
            ext: '.js'
          }
        ]
      }
    },

    clean: {
      build: ['.build']
    }

  });

  grunt.registerTask('test', ['jshint'/*, 'exec:spm-test'*/]);
  grunt.registerTask('build', ['sass', 'exec:spm-build']);

  grunt.registerTask('default', ['test', 'build', 'copy', 'uglify', 'clean']);
};
