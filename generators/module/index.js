'use strict';
var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');

var NdGenerator = yeoman.generators.Base.extend({

  initializing: function() {
  },

  writing: {

    app: function() {
      this.src.copy('_Gruntfile.js', 'Gruntfile.js');
      this.src.copy('jshintrc', '.jshintrc');
    },

    spm: function() {
      this.spawnCommand('spm', ['init', '-f']);
    }

  },

  end: function() {
  }
});

module.exports = NdGenerator;
