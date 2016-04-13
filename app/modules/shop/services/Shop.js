'use strict';

(function () {
  angular.module('ph.shop')
    .factory('Shop', Shop);

  function Shop() {
    var fromUtc = new Date();
    var toUtc = new Date();
    toUtc.setDate(toUtc.getDate() + 7);

    return {
      fromUtc: fromUtc,
      toUtc: toUtc
    };
  }
})();
