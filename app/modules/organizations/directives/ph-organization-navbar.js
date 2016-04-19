(function () {
  'use strict';

  angular.module('ph.organizations')
    .directive('phOrganizationNavbar', organizationNavbar);

  organizationNavbar.$inject = ['Auth'];
  function organizationNavbar(Auth) {
    return {
      restrict: 'EA',
      replace: 'true',
      scope: {
        organizationId: '='
      },
      link: function ($scope) {
        $scope.accessLevels = Auth.accessLevels;
        $scope.userRoles = Auth.userRoles;
      },
      templateUrl: 'modules/organizations/views/directives/ph-organization-navbar.html'
    }
  }
})();
