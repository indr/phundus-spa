'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:SignUp
 * @description
 * # SignUp
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('SignUp', ['$scope', 'Users', 'Organizations', 'Alert',
    function ($scope, Users, Organizations, Alert) {
      $scope.user = {};
      $scope.submitted = false;

      Organizations.query({}, function (res) {
        $scope.organizations = res.organizations;
      }, function () {
        Alert.error('Fehler beim Laden der Organisationen.')
      });

      $scope.submit = function () {
        if (!$scope.form.$valid) {
          Alert.error('Bitte überprüfe deine Eingaben.');
          return;
        }
        $scope.form.$submitting = true;
        Users.post($scope.user, function () {
          $scope.form.$submitting = false;
          $scope.submitted = true;
        }, function (res) {
          console.log(res);
          $scope.form.$submitting = false;
          Alert.error('Fehler bei der Registrierung: ' + res.data.message);
        });
      };

    }
  ]);
