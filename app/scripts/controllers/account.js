'use strict';

angular.module('phundusApp')
  .controller('UsersAccountCtrl', ['$scope', 'Alert', 'AccountChangeEmailAddress', 'AccountChangePassword',
    function ($scope, Alert, AccountChangeEmailAddress, AccountChangePassword) {
      $scope.submitChangeEmailAddressSubmitting = false;
      $scope.submitChangePasswordSubmitting = false;

      $scope.submitChangeEmailAddress = function () {
        $scope.submitChangeEmailAddressSubmitting = true;
        AccountChangeEmailAddress.post($scope.changeEmailAddress, function () {
          $scope.submitChangeEmailAddressSubmitting = false;
          Alert.success('Das Bestätigungs-E-Mail wurde versendet.');
          $scope.changeEmailAddress = {};
        }, function () {
          $scope.submitChangeEmailAddressSubmitting = false;
          Alert.error('Fehler beim Ändern der E-Mail-Addresse.')
        });
      };

      $scope.submitChangePassword = function () {
        $scope.submitChangePasswordSubmitting = true;
        AccountChangePassword.post($scope.changePassword, function () {
          $scope.submitChangePasswordSubmitting = false;
          Alert.success('Das Passwort wurde geändert.');
          $scope.changePassword = {};
        }, function () {
          $scope.submitChangePasswordSubmitting = false;
          Alert.error('Fehler beim Ändern des Passworts.')
        });
      }
    }
  ]);

angular.module('phundusApp')
  .controller('ResetPasswordCtrl', ['$scope', 'Alert', 'AccountResetPassword',
    function ($scope, Alert, AccountResetPassword) {
      $scope.submitted = false;

      $scope.submit = function () {
        $scope.form.$submitting = true;
        AccountResetPassword.post($scope.resetPassword, function () {
          $scope.form.$submitting = false;
          $scope.submitted = true;
        }, function () {
          $scope.form.$submitting = false;
          Alert.error('Fehler beim Zurücksetzen des Passworts.')
        });
      }
    }
  ]);
