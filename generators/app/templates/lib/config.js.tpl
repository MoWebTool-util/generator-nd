(function(window, seajs, undefined) {

  'use strict';

  if (!seajs) {
    return;
  }

  // 线上部署版本
  var appname = '@APPNAME';
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
      return addParam(url, '_ts', timestamp);
    });
  } else { // 部署模式
    map.push(function(url) {
      // 仅重定向 app 目录
      return addParam(url.replace(appname + '/app/', appname + '/dist/' + appname + '/app/'), '_v', version);
    });
  }

  seajs.config({
    base: '/',
    alias: {
      @ALIAS
      '$': appname + '/lib/jquery/jquery'
    },
    map: map
  });

  // if (seajs.development) {
  //   seajs.use(['seajs-style', 'seajs-debug', 'seajs-text']);
  // }

})(this, this.seajs);
