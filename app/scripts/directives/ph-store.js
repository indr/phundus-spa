'use strict';


/**
 * @ngdoc function
 * @name phundusApp.directive:phStore
 * @description
 * # phStore
 */
angular.module('phundusApp')
  .directive('phStore', ['$timeout', 'Stores', 'Alert', 'leafletData', 'leafletMarkersHelpers',
    function ($timeout, Stores, Alert, leafletData, leafletMarkersHelpers) {
      return {
        restrict: 'E',
        replace: 'true',
        scope: {
          loaded: '=',
          store: '=',
          isEditable: '='
        },
        link: function (scope) {

          var flaechenschwerpunktDerSchweiz = {
            lat: 46.80121,
            lng: 8.226692
          };

          $timeout(function () {
            leafletData.getMap().then(function (map) {
              map.setView(flaechenschwerpunktDerSchweiz, 7);
            });
          }, 0);

          var trySetViewToStore = function () {
            if (scope.store && scope.store.coordinate) {
              $timeout(function () {
                leafletData.getMap().then(function (map) {
                  var latLng = {
                    lat: scope.store.coordinate.latitude,
                    lng: scope.store.coordinate.longitude
                  };
                  map.setView(latLng, 16);

                  if (!scope.marker) {
                    scope.marker = leafletMarkersHelpers.createMarker(latLng, {
                      draggable: true
                    });
                    scope.marker.addTo(map);
                  }
                  else {
                    scope.marker.setLatLng(latLng);
                  }
                });
              }, 500);
            }
          };

          trySetViewToStore();

          scope.fromMap = function () {
            leafletData.getMap().then(function (map) {
              var center = map.getCenter();
              scope.userStoreCoordinateForm.latitude.$setViewValue(center.lat);
              scope.userStoreCoordinateForm.latitude.$render();
              scope.userStoreCoordinateForm.longitude.$setViewValue(center.lng);
              scope.userStoreCoordinateForm.longitude.$render();
            });
          };

          scope.$watch('store.coordinate.latitude', function () {
            //console.log('watched: store.coordinate.latitude');
            trySetViewToStore()
          });
          scope.$watch('store.coordinate.longitude', function () {
            //console.log('watched: store.coordinate.longitude');
            trySetViewToStore()
          });

          scope.updateAddress = function ($data) {
            Stores.putAddress(scope.store.storeId, $data.address, function () {
            }, function () {
              Alert.error("Fehler beim Speichern der Adresse.");
            });
          };
          scope.updateOpeningHours = function ($data) {
            Stores.putOpeningHours(scope.store.storeId, $data.openingHours, function () {
            }, function () {
              Alert.error("Fehler beim Speichern der Öffnungszeiten.");
            });
          };

          scope.updateCoordinate = function ($data) {
            Stores.putCoordinate(scope.store.storeId, $data, function () {
            }, function () {
              Alert.error("Fehler beim Speichern der Koordinate.");
            });
          }
        },
        templateUrl: 'views/directives/ph-store.html'
      }
    }])
;
