'use strict';

(function () {
  angular.module('phundusApp')
    .directive('phUserArticleNavbar', ['Auth',
      function (Auth) {
        return {
          restrict: 'E',
          replace: 'true',
          scope: {
            userId: '=',
            articleId: '=',
            articleShortId: '='
          },
          link: function ($scope) {
            $scope.accessLevels = Auth.accessLevels;
            $scope.userRoles = Auth.userRoles;
            //$scope.isHome = $scope.userId + '' === Auth.user.userId + '';
          },
          templateUrl: 'modules/users/views/directives/ph-user-article-navbar.html'
        }
      }
    ]);

})();
