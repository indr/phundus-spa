'use strict';

/**
 * @ngdoc function
 * @name phundusApp.filter:replace
 * @description
 * # replace
 * Filter of the phundusApp
 */
angular.module('phundusApp')
  .filter('replace', function () {
    return function(input, pattern, replace) {
      if (input === undefined || input === null) {
        return null;
      }
      return input.replace(new RegExp(pattern, 'mg'), replace);
    };
  });
