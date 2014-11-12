module.exports = function(grunt) {

  'use strict';

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    jshint: {
      files: ['index.js', 'src/**/*.js'],
      options: {
        jshintrc: true
      }
    },

    exec: {
      'spm-build': 'spm build',
      'spm-doc-build': 'spm doc build',
      'spm-doc-watch': 'spm doc watch',
      'spm-doc-publish': 'spm doc publish',
      'spm-doc-publish-r': 'spm doc publish -r http://127.0.0.1:3000',
      'spm-init': 'spm init',
      'spm-publish': 'spm publish',
      'spm-publish-r': 'spm publish --registry http://127.0.0.1:3000',
      'spm-test': 'spm test'
    }

  });

  grunt.registerTask('test', ['jshint', 'exec:spm-test']);

  grunt.registerTask('doc', ['exec:spm-doc-watch']);

  grunt.registerTask('publish', ['test', 'exec:spm-publish']);
  grunt.registerTask('publish-local', ['test', 'exec:spm-publish-r']);

  grunt.registerTask('publish-doc', ['exec:spm-doc-publish']);
  grunt.registerTask('publish-doc-local', ['exec:spm-doc-publish-r']);

  grunt.registerTask('default', ['doc']);

};
