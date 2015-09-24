'use strict';


/**
 * @ngdoc function
 * @name phundusApp.directive:phUserStore
 * @description
 * # phUserStore
 */
angular.module('phundusApp')
  .directive('phUserStore', ['$timeout', 'Stores', 'Alert', 'leafletData', function ($timeout, Stores, Alert, leafletData) {
    return {
      restrict: 'E',
      replace: 'true',
      scope: {
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
                map.setView({
                  lat: scope.store.coordinate.latitude,
                  lng: scope.store.coordinate.longitude
                }, 16);
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
          }, function (err) {
            Alert.danger(err);
          });
        };
        scope.updateOpeningHours = function ($data) {
          Stores.putOpeningHours(scope.store.storeId, $data.openingHours, function () {
          }, function (err) {
            Alert.danger(err);
          });
        };

        scope.updateCoordinate = function ($data) {
          Stores.putCoordinate(scope.store.storeId, $data, function () {
          }, function (err) {
            Alert.danger(err);
          });
        }
      },
      templateUrl: 'views/directives/ph-user-store.html'
    }
  }])
;
