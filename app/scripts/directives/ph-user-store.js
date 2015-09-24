'use strict';


/**
 * @ngdoc function
 * @name phundusApp.directive:phUserStore
 * @description
 * # phUserStore
 */
angular.module('phundusApp')
  .directive('phUserStore', ['Stores', 'Alert', function (Stores, Alert) {
    return {
      restrict: 'E',
      replace: 'true',
      scope: {
        store: '=',
        isEditable: '=',
        map: '='
      },
      link: function (scope) {
        scope.updateAddress = function () {
          Stores.putAddress(scope.store.storeId, scope.store.address, function () {
          }, function (err) {
            Alert.danger(err);
          });
        };
        scope.updateOpeningHours = function () {
          Stores.putOpeningHours(scope.store.storeId, scope.store.openingHours, function () {
          }, function (err) {
            Alert.danger(err);
          });
        };
        scope.updateCoordinate = function () {
          Stores.putCoordinate(scope.store.storeId, scope.store.coorindate, function () {
          }, function (err) {
            Alert.danger(err);
          });
        }
      },
      templateUrl: 'views/directives/ph-user-store.html'
    }
  }]);
