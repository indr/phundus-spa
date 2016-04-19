(function () {
  'use strict';

  angular.module('ph.organizations')
    .controller('OrganizationsCtrl', OrganizationsCtrl);

  OrganizationsCtrl.$inject = ['$scope', 'Organizations', 'Alert'];
  function OrganizationsCtrl($scope, Organizations, Alert) {
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
})();
