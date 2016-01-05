'use strict';

/**
 * @ngdoc function
 * @name phundusApp.directive:phCheckbox
 * @description
 * # phCheckbox
 */
angular.module('phundusApp')
  .directive('phCheckbox', [function () {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        spin: '='
      },
      template: '<div data-ng-class="{\'checkbox\': true}" data-ng-hide="spin" data-ng-transclude></div><span class="glyphicon glyphicon-refresh glyphicon-spin" data-ng-show="spin"></span>'
    }
  }]);
