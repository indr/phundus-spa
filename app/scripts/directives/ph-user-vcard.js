'use strict';

/**
 * @ngdoc function
 * @name phundusApp.directive:phUserVcard
 * @description
 * # phUserVcard
 */
angular.module('phundusApp')
  .directive('phUserVcard', [function () {
    return {
      restrict: 'E',
      replace: 'true',
      scope: {
        user: '=',
        isEditable: '='
      },
      templateUrl: 'views/directives/ph-user-vcard.html'
    }
  }]);
