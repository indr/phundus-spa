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
        user: '=user'
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
        store: '=store'
      },
      templateUrl: 'views/directives/ph-user-store.html'
    }
  }]);
