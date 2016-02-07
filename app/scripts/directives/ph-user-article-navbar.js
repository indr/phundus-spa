'use strict';

/**
 * @ngdoc function
 * @name phundusApp.directive:phUserArticleNavbar
 * @description
 * # phUserArticleNavbar
 */
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
        templateUrl: 'views/directives/ph-user-article-navbar.html'
      }
    }
  ]);
