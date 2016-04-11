'use strict';

(function () {

  angular.module('phundusApp')
    .controller('OrganizationsCtrl', ['$scope', 'Organizations', 'Alert',
      function ($scope, Organizations, Alert) {
        $scope.loading = true;

        Organizations.query(function (res) {
          $scope.organizations = res.results;
          $scope.displayedOrganizations = [].concat($scope.organizations);
          $scope.loading = false;
        }, function () {
          Alert.error("Fehler beim Laden der Organisationen.");
          $scope.loading = false;
        });
      }
    ]);

})();
