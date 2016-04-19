(function () {
  'use strict';

  angular.module('ph.ui')
    .filter('guid', function () {
      return function (input, length) {
        if (input === undefined || input === null) {
          return null;
        }
        length = length || 5;
        return input.substring(0, length);
      };
    });
})();
