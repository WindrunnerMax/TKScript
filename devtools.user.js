// ==UserScript==
// @name        Remove Debugger Interceptor
// @description 移除调试器拦截器
// @namespace   https://github.com/WindrunnerMax/TKScript
// @version     1.0.0
// @author      Czy
// @match       http://*/*
// @match       https://*/*
// @supportURL  https://github.com/WindrunnerMax/TKScript/issues
// @license     GPL License
// @installURL  https://github.com/WindrunnerMax/TKScript
// @run-at      document-start
// @grant       unsafeWindow
// ==/UserScript==
(function () {
  'use strict';

  let isHooked = false;
  const InitLog = unsafeWindow.console.log;
  const InitSetInterval = unsafeWindow.setInterval;
  const InitCloseWindow = unsafeWindow.close;
  const InitFunctionConstructor = unsafeWindow.Function.prototype.constructor;
  unsafeWindow.logger = InitLog;
  function hookedFunctionConstructor(...args) {
    if (args[0] == "debugger") {
      return function() {
        isHooked = true;
      };
    }
    return InitFunctionConstructor(...args);
  }
  unsafeWindow.Function.prototype.constructor = hookedFunctionConstructor;
  function hookedSetInterval(callback, ms, ...args) {
    if (callback && callback.toString()) {
      const funString = callback.toString();
      if (funString.includes("debugger") || funString.includes("window.close") || /\.ondevtool/i.test(funString)) {
        isHooked = true;
        return -1;
      }
    }
    return InitSetInterval(callback, ms, ...args);
  }
  unsafeWindow.setInterval = hookedSetInterval;
  function hookedCloseWindow() {
    if (isHooked)
      return void 0;
    InitCloseWindow();
  }
  unsafeWindow.close = hookedCloseWindow;

}());
