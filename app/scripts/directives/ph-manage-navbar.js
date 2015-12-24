'use strict';

/**
 * @ngdoc function
 * @name phundusApp.directive:phManageNavbar
 * @description
 * # phManageNavbar
 */
angular.module('phundusApp')
  .directive('phManageNavbar', ['Auth', function (Auth) {
    return {
      restrict: 'E',
      replace: 'true',
      scope: {
        organizationId: '=organizationId'
      },
      link: function ($scope) {
        $scope.accessLevels = Auth.accessLevels;
        $scope.userRoles = Auth.userRoles;
      },
      templateUrl: 'views/directives/ph-manage-navbar.html'
    }
  }]);
