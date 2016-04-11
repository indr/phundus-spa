(function() {

  angular.module('phundusApp')

    .controller('StoresChangeContactCtrl', ['$scope', '$timeout', '$uibModalInstance', 'storeId', 'contact', 'Stores', 'PostalAddress',
      function ($scope, $timeout, $uibModalInstance, storeId, contact, Stores, PostalAddress) {

        $scope.contact = contact;

        $scope.ok = function () {
          if (!$scope.formChangeContact.$valid) {
            return;
          }

          $scope.success = null;
          $scope.error = null;

          Stores.patch({storeId: storeId}, {contact: $scope.contact}, function () {

            $scope.contact.postalAddress = PostalAddress.fromLines($scope.contact);

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
