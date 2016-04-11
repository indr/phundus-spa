'use strict';

(function () {

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
})();
