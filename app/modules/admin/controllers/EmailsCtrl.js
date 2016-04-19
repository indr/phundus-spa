(function () {
  'use strict';

  angular.module('ph.admin')
    .controller('AdminMailsIndexCtrl', ['$scope', 'Mails', 'Auth', 'Alert',
      function ($scope, Mails, Auth, Alert) {
        $scope.loading = true;
        $scope.userRoles = Auth.userRoles;

        Mails.query(function (res) {
          $scope.rowCollection = res.results;
          $scope.displayedCollection = [].concat($scope.rowCollection);
          $scope.loading = false;
        }, function () {
          Alert.error('Fehler beim Laden der E-Mails.');
          $scope.loading = false;
        });

        $scope.delete = function (row) {
          if (row) {
            Mails.delete({mailId: row.mailId}, function () {
              var index = $scope.rowCollection.indexOf(row);
              if (index !== -1) {
                $scope.rowCollection.splice(index, 1);
              }
            });
          }
          else {
            Mails.delete({}, function () {
              $scope.rowCollection = [];
            });
          }
        };
      }
    ]);
})();
