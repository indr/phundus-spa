'use strict';

(function () {
  angular.module('phundusApp')
    .factory('Shop', [
      function () {

        var fromUtc = new Date();
        var toUtc = new Date();
        toUtc.setDate(toUtc.getDate() + 7);

        return {
          fromUtc: fromUtc,
          toUtc: toUtc
        };
      }
    ]);
})();
