'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:OrganizationsCtrl
 * @description
 * # OrganizationsCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('OrganizationsCtrl', ['$scope', 'Organizations', 'Alert',
    function ($scope, Organizations, Alert) {
      $scope.loading = true;

      Organizations.getAll(function (res) {
        $scope.organizations = res;
        $scope.displayedOrganizations = [].concat($scope.organizations);
        $scope.loading = false;
      }, function () {
        Alert.error("Fehler beim Laden der Organisationen.");
        $scope.loading = false;
      });
    }
  ])

  .controller('OrganizationCtrl', ['organizationId', '$scope', '$sce', '$window', 'Alert', 'Auth', 'Organizations', 'Relationships', 'Applications', 'leafletData', 'leafletMarkersHelpers', '$timeout',
    function (organizationId, $scope, $sce, $window, Alert, Auth, Organizations, Relationships, Applications, leafletData, leafletMarkersHelpers, $timeout) {
      $scope.loading = true;
      $scope.accessLevels = Auth.accessLevels;
      $scope.organizationId = organizationId;

      $scope.hasContactOptions = function () {
        return $scope.organization && ($scope.organization.address || $scope.organization.emailAddress || $scope.organization.website);
      };

      Organizations.get(organizationId, function (res) {
        $scope.organization = res;
        $scope.startpage = $sce.trustAsHtml(res.startpage);

        $timeout(function () {
          leafletData.getMap().then(function (map) {

            var coordinate = $scope.organization.coordinate.split(',');
            var latLng = {
              lat: parseFloat(coordinate[0]),
              lng: parseFloat(coordinate[1])
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
            $scope.relationship = res;
          }, function () {
            Alert.error('Fehler beim Laden des Mitgliedschaftsstatus.');
          });
        }
      }, function () {
        Alert.error('Fehler beim Laden der Organisation.');
      });

      $scope.join = function () {
        if (!$window.confirm('Möchtest du dieser Organisation wirklich beitreten?')) {
          return;
        }

        Applications.post(organizationId, {}, function () {
          Alert.info('Die Mitgliedschaft wurde beantragt. Du erhältst ein E-Mail wenn ein Administrator diese bestätigt oder ablehnt.');
          $scope.relationship = {
            status: 'Application',
            timestamp: new Date()
          };
        }, function () {
          Alert.error('Fehler beim Beantragen der Mitgliedschaft.');
        });
      };
    }
  ]);
