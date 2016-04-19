(function () {
  'use strict';

  angular.module('ph.ui')
    .filter('replace', function () {
      return function (input, pattern, replace) {
        if (input === undefined || input === null) {
          return null;
        }
        return input.replace(new RegExp(pattern, 'mg'), replace);
      };
    });
})();
