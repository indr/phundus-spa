'use strict';

/**
 * @ngdoc function
 * @name phundusApp.directive:phDate
 * @description
 * # phDate
 */
angular.module('phundusApp')
  .directive('phGuid', [function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        value: '=value'
      },
      template: '<span title="{{value}}">{{value | guid}}</span>'
    }
  }]);
