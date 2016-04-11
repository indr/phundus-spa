'use strict';

(function () {
  angular.module('phundusApp')
    .directive('phUserVcard', [function () {
      return {
        restrict: 'E',
        replace: 'true',
        scope: {
          user: '=',
          isEditable: '=',
          isHome: '='
        },
        templateUrl: 'views/directives/ph-user-vcard.html'
      }
    }]);
})();
