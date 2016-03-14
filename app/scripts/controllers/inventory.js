'use strict';

angular.module('phundusApp')
  .controller('ArticlesActionsCtrl', ['$scope', 'articleId', 'ArticlesActions', 'Alert',
    function ($scope, articleId, ArticlesActions, Alert) {
      ArticlesActions.get({articleId: articleId}, function (res) {
        $scope.actions = res.results;
      }, function (res) {
        Alert.error('Fehler beim Laden der Artikel-Aktivitäten: ' + res.data.message);
      });
    }
  ])

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
