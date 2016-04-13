'use strict';

(function () {
  angular.module('ph.organizations')
    .directive('phOrganizationArticleNavbar', organizationProductNavbar);

  organizationProductNavbar.$inject = ['Auth'];
  function organizationProductNavbar(Auth) {
    return {
      restrict: 'EA',
      replace: 'true',
      scope: {
        organizationId: '=',
        articleId: '=',
        articleShortId: '='
      },
      link: function ($scope) {
        $scope.accessLevels = Auth.accessLevels;
        $scope.userRoles = Auth.userRoles;
      },
      templateUrl: 'modules/organizations/views/directives/ph-organization-product-navbar.html'
    }
  }
})();
