'use strict';

angular.module('phundusApp')
  .controller('UsersAccountCtrl', ['$scope', '$uibModal',
    function ($scope, $uibModal) {

      $scope.showChangePassword = function () {
        $uibModal.open({
          templateUrl: 'views/account/modal-change-password.html',
          controller: 'AccountChangePasswordCtrl'
        });
      };

      $scope.showChangeEmailAddress = function () {
        $uibModal.open({
          templateUrl: 'views/account/modal-change-email-address.html',
          controller: 'AccountChangeEmailAddressCtrl'
        });
      };
    }
  ]);

angular.module('phundusApp')
  .controller('AccountChangePasswordCtrl', ['$scope', '$uibModalInstance', 'Alert', 'AccountChangePassword',
    function ($scope, $uibModalInstance, Alert, AccountChangePassword) {
      $scope.ok = function () {
        if (!$scope.formChangePassword.$valid) {
          return;
        }

        $scope.formChangePassword.$submitting = true;
        AccountChangePassword.post($scope.changePassword, function () {
          $scope.formChangePassword.$submitting = false;
          if ($scope.formChangePassword) {
            $scope.formChangePassword.$setPristine();
            $scope.formChangePassword.$setUntouched();
          }
          $scope.changePassword = {};
          $uibModalInstance.close();
          Alert.success('Das Passwort wurde geändert.');
        }, function () {
          $scope.formChangePassword.$suclosebmitting = false;
          Alert.error('Fehler beim Ändern des Passworts.')
        });
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    }
  ]);

angular.module('phundusApp')
  .controller('AccountChangeEmailAddressCtrl', ['$scope', '$uibModalInstance', 'Alert', 'AccountChangeEmailAddress',
    function ($scope, $uibModalInstance, Alert, AccountChangeEmailAddress) {
      $scope.ok = function () {
        if (!$scope.formChangeEmailAddress.$valid) {
          return;
        }

        $scope.formChangeEmailAddress.$submitting = true;
        AccountChangeEmailAddress.post($scope.changeEmailAddress, function () {
          $scope.formChangeEmailAddress.$submitting = false;
          if ($scope.formChangeEmailAddress) {
            $scope.formChangeEmailAddress.$setPristine();
            $scope.formChangeEmailAddress.$setUntouched();
          }
          $scope.changeEmailAddress = {};
          $uibModalInstance.close();
          Alert.success('Das Bestätigungs-E-Mail wurde versendet.');
        }, function () {
          $scope.formChangeEmailAddress.$submitting = false;
          Alert.error('Fehler beim Ändern der E-Mail-Addresse.')
        });

      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
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
