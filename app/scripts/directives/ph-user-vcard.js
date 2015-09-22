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
        user: '=user',
        isEditable: '=isEditable'
      },
      templateUrl: 'views/directives/ph-user-vcard.html'
    }
  }]);


angular.module('phundusApp')
.directive('phUserStore', [function () {
    return {
      restrict: 'E',
      replace: 'true',
      scope: {
        store: '=store',
        isEditable: '=isEditable'
      },
      templateUrl: 'views/directives/ph-user-store.html'
    }
  }]);
