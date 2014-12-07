(function(window, seajs, undefined) {

  'use strict';

  if (!seajs) {
    return;
  }

  // debug 开关
  var debug = window.location.search.indexOf('debug') > 0;

  // 映射表
  var map = [];

  function addParam(url, name, value) {
    return url + (url.indexOf('?') === -1 ? '?' : '&') + name + (value !== undefined ? ('=' + value) : '');
  }

  if (debug) {
    // 开发模式
    var timestamp = new Date().getTime();
    map.push(function(url) {
      return addParam(url, '_ts', timestamp);
    });
  } else {
    // 部署模式
    map.push(function(url) {
      // 仅重定向 app 目录
      return addParam(url.replace('/app/', '/dist/@APPNAME/app/'), '_v', '@VERSION');
    });
  }

  seajs.config({
    base: '/',
    alias: {},
    map: map,
    debug: debug
  });

  // if (debug) {
  //   seajs.use(['seajs-style', 'seajs-debug', 'seajs-text']);
  // }

})(this, this.seajs);
