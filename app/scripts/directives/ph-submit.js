'use strict';

/**
 * @ngdoc function
 * @name phundusApp.directive:phCheckbox
 * @description
 * # phCheckbox
 */
angular.module('phundusApp')
  .directive('phSubmit', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        form: '=',
        text: '@'
      },
      template: '<button class="btn" type="submit" data-ng-disabled="form.$invalid || form.$submitting || form.$pending"><span class="glyphicon glyphicon-refresh glyphicon-spin" aria-hidden="true" data-ng-show="form.$submitting"></span> {{text}}</button>'
    }
  });
