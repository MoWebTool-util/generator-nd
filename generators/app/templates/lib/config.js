(function(window, seajs, undefined) {

  'use strict';

  if (!seajs) {
    return;
  }

  // 线上部署版本
  var version = '@VERSION';

  // 开关：true开发版本 false部署版本
  var development = seajs.development =
                    window.location.search.indexOf('development') > 0;

  // 时间戳，调试用
  var timestamp;

  // 映射表
  var map = [];

  function addParam(url, name, value) {
    return url + (url.indexOf('?') === -1 ? '?' : '&') + name + (value !== undefined ? ('=' + value) : '');
  }

  if (development) { // 开发模式
    timestamp = new Date().getTime();
    map.push(function(url) {
      return addParam(url.replace('/dist/', '/'), '_ts', timestamp);
    });
  } else { //部署模式（路径映射到dist）
    map.push(function(url) {
      return addParam(url, '_v', version);
    });
  }

  seajs.config({
    base: '/static',
    alias: {
      // 'seajs-debug': 'lib/seajs/seajs-debug/1.1.1/seajs-debug',
      // 'seajs-style': 'lib/seajs/seajs-style/1.1.0/seajs-style',
      // 'seajs-wrap': 'lib/seajs/seajs-wrap/1.0.2/seajs-wrap',
      '$': 'lib/jquery/1.11.1/jquery'
    },
    map: map
  });

  // if (seajs.development) {
  //   seajs.use(['seajs-style', 'seajs-debug']);
  // }

})(this, this.seajs);
