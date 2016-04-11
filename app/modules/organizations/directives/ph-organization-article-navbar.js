'use strict';

(function () {
  angular.module('phundusApp')
    .directive('phOrganizationArticleNavbar', ['Auth',
      function (Auth) {
        return {
          restrict: 'E',
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
          templateUrl: 'modules/organizations/views/directives/ph-organization-article-navbar.html'
        }
      }
    ]);

})();
