(function () {
  'use strict';

  angular.module('ph.admin')
    .controller('AdminOrganizationsIndexCtrl', ['$scope', 'AdminOrganizations', 'Organizations', 'Auth', 'Alert', '$window', '$state',
      function ($scope, AdminOrganizations, Organizations, Auth, Alert, $window, $state) {
        $scope.loading = true;
        AdminOrganizations.query(function (res) {
          $scope.rowCollection = res.results;
          $scope.displayedCollection = [].concat($scope.rowCollection);
          $scope.loading = false;
        }, function () {
          Alert.error('Fehler beim Laden der Organisationen.');
          $scope.loading = false;
        });

        $scope.establishOrganization = function () {
          var name = $window.prompt("Name der neuen Organisation", "");
          if (!name) {
            return;
          }

          Organizations.post({name: name}, function (res) {
            Alert.success('Die Organisation wurde erfolgreich gegründet.');
            $state.go('organization.home', {organizationId: res.organizationId});
          }, function () {
            Alert.error('Fehler beim Gründen der Organisation.');
          })
        };

        $scope.changePlan = function (row, plan) {
          Organizations.patch({organizationId: row.organizationId, plan: plan}, function () {
            row.plan = plan;
          });
        };
      }
    ]);
})();
