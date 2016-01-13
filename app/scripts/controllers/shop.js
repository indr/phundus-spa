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
  .controller('ShopCartCtrl', ['_', '$scope', 'userGuid', 'UsersCart', 'UsersCartItems', 'ShopItemsAvailabilityCheck', 'Alert', '$window', '$timeout',
    function (_, $scope, userGuid, UsersCart, UsersCartItems, ShopItemsAvailabilityCheck, Alert, $window, $timeout) {

      var checkAvailability = function (item) {
        item.availabilityChecking = true;
        $timeout(function () {
        ShopItemsAvailabilityCheck.post(item, function (res) {
          item.isAvailable = res.isAvailable;
          item.availabilityChecking = false;
        }, function (res) {
          Alert.error('Fehler beim Prüfen der Verfügbarkeit: ' + res.data.message);
        });
        }, 400);
      };

      $scope.checkAvailability = checkAvailability;

      var checkAllAvailabilities = function (items) {
        if (!items) {
          return;
        }
        _.forEach($scope.cart.items, function (item) {
          checkAvailability(item);
        });
      };

      UsersCart.get({userGuid: userGuid}, function (res) {
        $scope.cart = res;
        checkAllAvailabilities($scope.cart.items);
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
          toUtc: item.toUtc,
          isAvailable: item.isAvailable
        };

        item.editing = true;
      };

      $scope.cancelEditing = function (item) {
        item.editing = false;
        item.quantity = $scope.saveValues.quantity;
        item.fromUtc = $scope.saveValues.fromUtc;
        item.toUtc = $scope.saveValues.toUtc;
        item.isAvailable = $scope.saveValues.isAvailable;
      };

      $scope.saveEditedItem = function (item) {

        UsersCartItems.patch({userGuid: userGuid, cartItemGuid: item.cartItemGuid}, item,
          function () {
            item.editing = false;
            $scope.calculateDaysAndItemTotal(item);
            checkAvailability(item);
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
