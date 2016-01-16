'use strict';

/**
 * @ngdoc function
 * @name phundusApp.filter:replace
 * @description
 * # replace
 * Filter of the phundusApp
 */
angular.module('phundusApp')
  .filter('guid', function () {
    return function(input, length) {
      if (input === undefined || input === null) {
        return null;
      }
      length = length || 5;
      return input.substring(0, length);
    };
  });
