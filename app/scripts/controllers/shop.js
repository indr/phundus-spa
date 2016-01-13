'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:ShopCtrl
 * @description
 * # ShopCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('ShopCtrl', ['$timeout', '$window',
    function ($timeout, $window) {
      $timeout(function () {
        $window.location.href = 'shop';
      }, 0);
    }
  ]);

/**
 * @ngdoc function
 * @name phundusApp.controller:ShopCartCtrl
 * @description
 * # ShopCartCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('ShopCartCtrl', ['$scope', 'userGuid', 'UsersCart', 'UsersCartItems', 'Alert', '$window',
    function ($scope, userGuid, UsersCart, UsersCartItems, Alert, $window) {

      UsersCart.get({userGuid: userGuid}, function (res) {
        $scope.cart = res;
      }, function (res) {
        Alert.error('Fehler beim Laden des Warenkorbes: ' + res.data.message);
      });

      $scope.canEdit = function () {
        return true;
      };

      $scope.editItem = function (item) {
        $scope.saveValues = {
          quantity: item.quantity,
          fromUtc: item.fromUtc,
          toUtc: item.toUtc
        };

        item.editing = true;
      };

      $scope.cancelEditing = function (item) {
        item.editing = false;
        item.quantity = $scope.saveValues.quantity;
        item.fromUtc = $scope.saveValues.fromUtc;
        item.toUtc = $scope.saveValues.toUtc;
      };

      $scope.saveEditedItem = function (item) {

        UsersCartItems.patch({userGuid: userGuid, cartItemGuid: item.cartItemGuid}, item,
          function () {
            item.editing = false;
            $scope.calculateDaysAndItemTotal(item);
          }, function (res) {
            Alert.error(res.data.message);
          });
      };

      $scope.removeItem = function (item) {
        if (!$window.confirm('Möchten Sie die Position "' + item.text + '" wirklich löschen?')) {
          return;
        }

        UsersCartItems.delete({userGuid: userGuid, cartItemGuid: item.cartItemGuid}, function () {
          var idx = $scope.cart.items.indexOf(item);
          $scope.cart.items.splice(idx, 1);
        });
      };

      $scope.calculateDaysAndItemTotal = function (item) {
        var diff = (new Date(item.toUtc) - new Date(item.fromUtc)) + 1;
        console.log(item.toUtc, item.fromUtc, diff);
        item.days = Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));

        item.itemTotal = Math.max(1, Math.round(item.unitPricePerWeek / 7 * item.days * item.quantity));
      };

      $scope.getTotal = function () {
        if (!$scope.cart || !$scope.cart.items) {
          return 0;
        }

        var total = 0;

        for (var i = 0; i < $scope.cart.items.length; i++) {
          total += parseFloat($scope.cart.items[i].itemTotal);
        }
        return total;
      };
    }
  ]);
