'use strict';

angular.module('phundusApp')
  .controller('UsersAccountCtrl', ['$scope', '$uibModal', 'userId', 'Users',
    function ($scope, $uibModal, userId, Users) {

      Users.get({userId: userId}, function (res) {
        var address = res.address;
        address.postcode = parseInt(address.postcode);
        $scope.address = address;
        $scope.emailAddress = res.email;
      });

      $scope.showChangeContact = function () {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/account/modal-change-contact.html',
          controller: 'AccountChangeContactCtrl',
          resolve: {
            userId: function () {
              return userId
            },
            contact: angular.copy($scope.address)
          }
        });

        modalInstance.result.then(function (contact) {
          $scope.address = contact;
        });
      };

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
  .controller('AccountChangeContactCtrl', ['$scope', '$timeout', '$uibModalInstance', 'userId', 'contact', 'UsersAddress',
    function ($scope, $timeout, $uibModalInstance, userId, contact, UsersAddress) {

      $scope.contact = contact;

      $scope.ok = function () {
        if (!$scope.formChangeContact.$valid) {
          return;
        }

        $scope.success = null;
        $scope.error = null;

        UsersAddress.put({userId: userId}, $scope.contact, function () {
          $scope.success = 'Die Kontaktangaben wurden erfolgreich geändert.';
          $timeout(function () {
            $uibModalInstance.close($scope.contact);
          }, 2000);
        }, function () {
          $scope.error = 'Fehler beim Speichern der Kontaktangaben.';
        });
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    }
  ]);

angular.module('phundusApp')
  .controller('AccountChangePasswordCtrl', ['$scope', '$uibModalInstance', '$timeout', 'AccountChangePassword',
    function ($scope, $uibModalInstance, $timeout, AccountChangePassword) {
      $scope.ok = function () {
        if (!$scope.formChangePassword.$valid) {
          return;
        }

        $scope.success = null;
        $scope.error = null;

        $scope.formChangePassword.$submitting = true;
        AccountChangePassword.post($scope.changePassword, function () {
          $scope.formChangePassword.$submitting = false;
          if ($scope.formChangePassword) {
            $scope.formChangePassword.$setPristine();
            $scope.formChangePassword.$setUntouched();
          }
          $scope.changePassword = {};
          $scope.success = 'Das Passwort wurde erfolgreich geändert.';
          $timeout(function () {
            $uibModalInstance.close();
          }, 2000);
        }, function () {
          $scope.formChangePassword.$submitting = false;
          $scope.error = 'Fehler beim Ändern des Passworts.';
        });
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    }
  ]);

angular.module('phundusApp')
  .controller('AccountChangeEmailAddressCtrl', ['$scope', '$uibModalInstance', '$timeout', 'AccountChangeEmailAddress',
    function ($scope, $uibModalInstance, $timeout, AccountChangeEmailAddress) {
      $scope.ok = function () {
        if (!$scope.formChangeEmailAddress.$valid) {
          return;
        }

        $scope.success = null;
        $scope.error = null;

        $scope.formChangeEmailAddress.$submitting = true;
        AccountChangeEmailAddress.post($scope.changeEmailAddress, function () {
          $scope.formChangeEmailAddress.$submitting = false;
          if ($scope.formChangeEmailAddress) {
            $scope.formChangeEmailAddress.$setPristine();
            $scope.formChangeEmailAddress.$setUntouched();
          }
          $scope.changeEmailAddress = {};
          $scope.success = 'Das Bestätigungs-E-Mail wurde versendet.';
          $timeout(function () {
            $uibModalInstance.close();
          }, 2000);
        }, function () {
          $scope.formChangeEmailAddress.$submitting = false;
          $scope.error = 'Fehler beim Ändern der E-Mail-Addresse.';
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
