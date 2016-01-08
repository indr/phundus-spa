'use strict';

angular.module('phundusApp')
  .controller('ResetPasswordCtrl', ['$scope', 'Alert', 'ResetPassword',
    function ($scope, Alert, ResetPassword) {
      $scope.submitted = false;

      $scope.submit = function () {
        $scope.form.$submitting = true;
        ResetPassword.post($scope.resetPassword, function () {
          $scope.form.$submitting = false;
          $scope.submitted = true;
        }, function () {
          $scope.form.$submitting = false;
          Alert.error('Fehler beim Zurücksetzen des Passworts.')
        });
      }
    }
  ]);
