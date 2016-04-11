'use strict';

(function () {
  angular.module('phundusApp')
    .directive('phUserNavbar', ['Auth', function (Auth) {
      return {
        restrict: 'E',
        replace: 'true',
        scope: false,
        link: function ($scope) {
          $scope.accessLevels = Auth.accessLevels;
          $scope.userRoles = Auth.userRoles;
          $scope.isHome = $scope.userId + '' === Auth.user.userId + '';
        },
        templateUrl: 'views/directives/ph-user-navbar.html'
      }
    }]);
})();
