'use strict';

/**
 * @ngdoc function
 * @name phundusApp.directive:phUserVcard
 * @description
 * # phUserVcard
 */
angular.module('phundusApp')
  .directive('phUserVcard', [function () {
    return {
      restrict: 'E',
      replace: 'true',
      scope: {
        user: '=',
        isEditable: '='
      },
      templateUrl: 'views/directives/ph-user-vcard.html'
    }
  }]);


angular.module('phundusApp')
  .directive('phUserStore', ['Stores', 'Alert', function (Stores, Alert) {
    return {
      restrict: 'E',
      replace: 'true',
      scope: {
        store: '=',
        isEditable: '='
      },
      link: function (scope) {
        scope.updateAddress = function (data) {
          Stores.putAddress(scope.store.storeId, data, function () {
            Alert.success('Address successfully saved.')
          }, function (err) {
            Alert.danger(err);
          });
        };
        scope.updateOpeningHours = function (data) {
          Stores.putOpeningHours(scope.store.storeId, data, function () {
            Alert.success('Opening hours successfully saved.')
          }, function (err) {
            Alert.danger(err);
          });
        };
      },
      templateUrl: 'views/directives/ph-user-store.html'
    }
  }]);
