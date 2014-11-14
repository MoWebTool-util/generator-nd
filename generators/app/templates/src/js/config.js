(function() {

  'use strict';

  var version = '@VERSION'; // 线上部署版本
  var development = true; // 开关：true开发版本 false部署版本
  var plugins = [];
  var map = [];
  var dist;
  var src;
  var timestamp;

  if (location.search.indexOf('development') > 0) {
    development = true;
  }

  if (development) { // 开发模式
    dist = 'dist/js/';
    src = 'src/js/';
    timestamp = new Date().getTime();
    map.push(function(url) {
      if (url.indexOf(dist) > 0) {
        url = url.replace(dist, src);
      }
      url += (url.indexOf('?') === -1 ? '?' : '&') + '_ts=' + timestamp;
      return url;
    });
  } else { //部署模式（路径映射到dist）
    map.push(function(url) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + '_v=' + version;
      return url;
    });
  }

  seajs.development = development;

  seajs.config({
    plugins: plugins,
    map: map,
    alias: {
      '$': 'jquery/jquery',
      'seajs-debug': 'seajs/seajs-debug'
    }
  });

})();
