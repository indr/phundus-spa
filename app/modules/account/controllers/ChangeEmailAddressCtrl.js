'use strict';

(function () {


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

})();
