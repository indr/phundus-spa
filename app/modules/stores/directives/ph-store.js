(function () {
  'use strict';

  angular.module('ph.stores')
    .directive('phStore', phStore);


  function phStore($timeout, Stores, Alert, leafletData, leafletMarkersHelpers, StoresEditContactDetailsModal) {
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
          if (scope.coordinateForm.$visible) {
            return;
          }
          if (scope.store && scope.store.coordinate) {
            if (!angular.isNumber(scope.store.coordinate.latitude) || (!angular.isNumber(scope.store.coordinate.longitude))) {
              return;
            }
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
            scope.store.coordinate = {latitude: center.lat, longitude: center.lng};
            scope.coordinateForm.$setDirty();
          });
        };

        scope.$watch('store.coordinate.latitude', function () {
          trySetViewToStore();
        });
        scope.$watch('store.coordinate.longitude', function () {
          trySetViewToStore();
        });

        scope.updateName = function () {
          scope.nameForm.$submitting = true;
          Stores.patch({storeId: scope.store.storeId, name: scope.store.name}, function () {
            scope.nameForm.$submitting = false;
            scope.nameForm.$visible = false;
          }, function () {
            scope.nameForm.$submitting = false;
            Alert.error('Fehler beim Speichern des Namens.');
          });
        };

        scope.showChangeContact = function () {
          var modal = StoresEditContactDetailsModal.open({
            storeId: function () { return scope.store.storeId; },
            contact: function () { return angular.copy(scope.store.contact); }
          });

          modal.then(function (contact) {
            scope.store.contact = contact;
          });
        };

        scope.updateOpeningHours = function () {
          scope.openingHoursForm.$submitting = true;
          Stores.patch({storeId: scope.store.storeId, openingHours: scope.store.openingHours}, function () {
            scope.openingHoursForm.$submitting = false;
            scope.openingHoursForm.$visible = false;
          }, function () {
            scope.openingHoursForm.$submitting = false;
            Alert.error("Fehler beim Speichern der Öffnungszeiten.");
          });
        };

        scope.updateCoordinate = function () {
          scope.coordinateForm.$submitting = true;
          Stores.patch({storeId: scope.store.storeId, coordinate: scope.store.coordinate}, function () {
            scope.coordinateForm.$submitting = false;
            scope.coordinateForm.$visible = false;
            trySetViewToStore();
          }, function () {
            scope.coordinateForm.$submitting = false;
            Alert.error("Fehler beim Speichern der Koordinate.");
          });
        }
      },
      templateUrl: 'modules/stores/views/directives/ph-store.html'
    }
  }
})();
