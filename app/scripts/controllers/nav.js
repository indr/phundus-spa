'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('NavCtrl', ['$rootScope', '$scope', '$state', '$location', '$window', 'Auth', 'Alert', 'Organizations',
    function ($rootScope, $scope, $state, $location, $window, Auth, Alert, Organizations) {

      $rootScope.alerts = Alert.alerts;

      $rootScope.dismissAlert = function(type, id) {
        Alert.dismiss(type, id);
      };

      $scope.user = Auth.user;
      $scope.userRoles = Auth.userRoles;
      $scope.accessLevels = Auth.accessLevels;

      $scope.queryString = '';
      $scope.search = function () {
        $window.location.href = '/shop/Search?queryString=' + $scope.queryString;
      };

      $scope.logout = function () {
        Auth.logout(function () {
            $location.path('/goodbye');
          },
          function (err) {
            Alert.error(err);
          });
      };

      $scope.establishOrganization = function () {
        var name = $window.prompt("Name der neuen Organisation", "");
        if (!name) {
          return;
        }

        Organizations.post({name: name}, function(res) {
          Alert.success('Die Organisation wurde erfolgreich gegründet.');
          $state.go('public.organization', {organizationId: res.organizationId});
        }, function () {
          Alert.error('Fehler beim Gründen der Organisation.');
        })
      }
    }]);
