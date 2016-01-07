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

          scope.coordinate = {latitude: null, longitude: null};
          if (scope.store) {
            scope.coordinate = scope.store.coordinate || scope.coordinate;
          }

          console.log(scope.coordinate);

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
            if (scope.coordinateForm.$visible) {
              return;
            }
            if (scope.store && scope.coordinate) {
              if (!angular.isNumber(scope.coordinate.latitude) || (!angular.isNumber(scope.coordinate.longitude))) {
                return;
              }
              $timeout(function () {
                leafletData.getMap().then(function (map) {
                  var latLng = {
                    lat: scope.coordinate.latitude,
                    lng: scope.coordinate.longitude
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
              scope.coordinate = {latitude: center.lat, longitude: center.lng};
            });
          };

          scope.$watch('coordinate.latitude', function () {
            trySetViewToStore();
          });
          scope.$watch('coordinate.longitude', function () {
            trySetViewToStore();
          });

          scope.updateAddress = function () {
            scope.addressForm.$submitting = true;
            Stores.patch({storeId: scope.store.storeId, address: scope.store.address}, function () {
              scope.addressForm.$submitting = false;
              scope.addressForm.$visible = false;
            }, function () {
              scope.addressForm.$submitting = false;
              Alert.error("Fehler beim Speichern der Adresse.");
            });
          };
          scope.updateOpeningHours = function () {
            scope.openingHoursForm.$submitting = true;
            Stores.patch({storeId: scope.store.storeId, openingHours: scope.store.openingHours}, function () {
              scope.openingHoursForm.$submitting = false;
              scope.openingHoursForm.$visible = false;
            }, function () {
              scope.openingHoursForm.$submitting = false;
              Alert.error("Fehler beim Speichern der Adresse.");
            });
          };

          scope.updateCoordinate = function () {
            scope.coordinateForm.$submitting = true;
            Stores.patch({storeId: scope.store.storeId, coordinate: scope.coordinate}, function () {
              scope.coordinateForm.$submitting = false;
              scope.coordinateForm.$visible = false;
              trySetViewToStore();
            }, function () {
              scope.coordinateForm.$submitting = false;
              Alert.error("Fehler beim Speichern der Adresse.");
            });
          }
        },
        templateUrl: 'views/directives/ph-store.html'
      }
    }])
;
