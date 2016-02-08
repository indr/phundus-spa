'use strict';

/**
 * @ngdoc function
 * @name phundusApp.directive:phDate
 * @description
 * # phDate
 */
angular.module('phundusApp')
  .directive('phDate', [
    function () {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          value: '=',
          format: '@'
        },
        link: function (scope) {
          scope.format = scope.format || 'mediumDate';
        },
        template: '<span title="{{value | date:\'medium\'}}">{{value | date:format}}</span>'
      }
    }
  ]);
