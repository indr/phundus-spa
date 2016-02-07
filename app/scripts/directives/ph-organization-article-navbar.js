'use strict';

/**
 * @ngdoc function
 * @name phundusApp.directive:phOrganizationArticleNavbar
 * @description
 * # phOrganizationArticleNavbar
 */
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
        templateUrl: 'views/directives/ph-organization-article-navbar.html'
      }
    }
  ]);
