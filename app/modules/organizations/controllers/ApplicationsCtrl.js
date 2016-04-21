(function () {
  'use strict';

  angular.module('ph.organizations')
    .controller('OrganizationApplicationsCtrl', OrganizationApplicationsCtrl);


  function OrganizationApplicationsCtrl(_, $scope, organizationId, Applications, Members, Alert) {
    Applications.query({organizationId: organizationId}, function (res) {
      $scope.rowCollection = res.results;
      $scope.displayedCollection = [].concat($scope.rowCollection);
    }, function () {
      Alert.error('Fehler beim Laden der Beitrittsanfragen.');
    });

    $scope.approve = function (row) {
      row.isApproving = true;
      Members.post({organizationId: organizationId, applicationId: row.applicationId}, function () {
        row.isApproved = true;
        row.isApproving = false;
        var index = $scope.rowCollection.indexOf(row);
        if (index !== -1) {
          $scope.rowCollection.splice(index, 1);
        }
      }, function () {
        row.isApproving = false;
        Alert.error('Fehler beim Bestätigen der Beitrittsanfrage.')
      });
    };

    $scope.reject = function (row) {
      row.isRejecting = true;
      Applications.delete({organizationId: organizationId, applicationId: row.applicationId}, function () {
        row.isRejected = true;
        row.isRejecting = false;
        var index = $scope.rowCollection.indexOf(row);
        if (index !== -1) {
          $scope.rowCollection.splice(index, 1);
        }
      }, function () {
        row.isRejecting = false;
        Alert.error('Fehler beim Ablehnen der Beitrittsanfrage.')
      });
    };
  }
})();
