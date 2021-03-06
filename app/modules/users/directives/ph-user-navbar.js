(function () {
  'use strict';

  angular.module('ph.users')
    .directive('phUserNavbar', userNavbar);


  function userNavbar(Auth) {
    return {
      restrict: 'E',
      replace: 'true',
      scope: false,
      link: function ($scope) {
        $scope.accessLevels = Auth.accessLevels;
        $scope.userRoles = Auth.userRoles;
        $scope.isHome = $scope.userId + '' === Auth.user.userId + '';
      },
      templateUrl: 'modules/users/views/directives/ph-user-navbar.html'
    }
  }
})();
