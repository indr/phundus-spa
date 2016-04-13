'use strict';

(function () {
  angular.module('ph.organizations')
    .controller('OrganizationCtrl', OrganizationCtrl);

  OrganizationCtrl.$inject = ['organizationId', '$scope', '$sce', 'Alert', 'Auth', 'Organizations', 'Relationships', 'Applications', 'leafletData', 'leafletMarkersHelpers', '$timeout'];
  function OrganizationCtrl(organizationId, $scope, $sce, Alert, Auth, Organizations, Relationships, Applications, leafletData, leafletMarkersHelpers, $timeout) {
    $scope.loading = true;
    $scope.accessLevels = Auth.accessLevels;
    $scope.organization = null;
    $scope.organizationId = organizationId;

    $scope.hasContactOptions = function () {
      return $scope.organization && ($scope.organization.address || $scope.organization.emailAddress || $scope.organization.website);
    };

    Organizations.get({organizationId: organizationId}, function (res) {
      $scope.organization = res;
      $scope.startpage = $sce.trustAsHtml(res.startpage);

      $timeout(function () {
        if (!$scope.organization.stores[0] || !$scope.organization.stores[0].coordinate) {
          return;
        }

        leafletData.getMap().then(function (map) {

          var coordinate = $scope.organization.stores[0].coordinate;
          var latLng = {
            lat: coordinate.latitude,
            lng: coordinate.longitude
          };
          map.setView(latLng, 14);

          if (!$scope.marker) {
            $scope.marker = leafletMarkersHelpers.createMarker(latLng);
            $scope.marker.addTo(map);

            //$scope.marker.bindPopup($scope.organization.name).openPopup();
          }
          else {
            $scope.marker.setLatLng(latLng);
          }
        });
      }, 0);

      if (Auth.isLoggedIn()) {
        Relationships.get(organizationId, function (res) {
          $scope.relationship = res.result;
        }, function () {
          Alert.error('Fehler beim Laden des Mitgliedschaftsstatus.');
        });
      }
    }, function () {
      Alert.error('Fehler beim Laden der Organisation.');
    });

    $scope.join = function () {
      $scope.isJoining = true;
      Applications.post({organizationId: organizationId}, function () {
        $scope.isJoining = false;
        Alert.info('Die Mitgliedschaft wurde beantragt. Du erhältst ein E-Mail wenn ein Administrator diese bestätigt oder ablehnt.');
        $scope.relationship = {
          status: 'application',
          timestamp: new Date()
        };
      }, function () {
        $scope.isJoining = false;
        Alert.error('Fehler beim Beantragen der Mitgliedschaft.');
      });
    };
  }
})();
