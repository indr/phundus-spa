'use strict';

angular.module('phundusApp')
  .controller('UsersAccountCtrl', ['$scope', 'Alert', 'AccountChangeEmailAddress', 'AccountChangePassword',
    function ($scope, Alert, AccountChangeEmailAddress, AccountChangePassword) {

      $scope.submitChangeEmailAddress = function () {
        $scope.formChangeEmailAddress.$submitting = true;
        AccountChangeEmailAddress.post($scope.changeEmailAddress, function () {
          $scope.formChangeEmailAddress.$submitting = false;
          if ($scope.formChangeEmailAddress) {
            $scope.formChangeEmailAddress.$setPristine();
            $scope.formChangeEmailAddress.$setUntouched();
          }
          $scope.changeEmailAddress = {};
          Alert.success('Das Bestätigungs-E-Mail wurde versendet.');
        }, function () {
          $scope.formChangeEmailAddress.$submitting = false;
          Alert.error('Fehler beim Ändern der E-Mail-Addresse.')
        });
      };

      $scope.submitChangePassword = function () {
        $scope.formChangePassword.$submitting = true;
        AccountChangePassword.post($scope.changePassword, function () {
          $scope.formChangePassword.$submitting = false;
          if ($scope.formChangePassword) {
            $scope.formChangePassword.$setPristine();
            $scope.formChangePassword.$setUntouched();
          }
          $scope.changePassword = {};
          Alert.success('Das Passwort wurde geändert.');
        }, function () {
          $scope.formChangePassword.$submitting = false;
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
