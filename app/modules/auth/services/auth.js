'use strict';

(function () {
  angular.module('phundusApp')
    .provider('auth', auth);

  function auth() {
    return {
      $get: $get,
      accessLevels: window.routingConfig.accessLevels
    };
  }

  function $get() {
    return {

    }
  }

})();
