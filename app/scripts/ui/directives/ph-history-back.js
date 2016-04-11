'use strict';

/**
 * @ngdoc function
 * @name phundusApp.directive:phHistoryBack
 * @description
 * # phHistoryBack
 */
angular.module('phundusApp')
  .directive('phHistoryBack', function ($window) {
    return {
      restrict: 'A',
      link: function (scope, elem) {
        elem.bind('click', function () {
          $window.history.back();
        });
      }
    }
  });
