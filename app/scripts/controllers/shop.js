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


angular.module('phundusApp')
  .controller('ShopCheckoutCtrl', ['_', '$scope', 'userGuid', 'UsersCart', 'Lessors', 'Lessees', 'Alert',
    function (_, $scope, userGuid, UsersCart, Lessors, Lessees, Alert) {
      UsersCart.get({userGuid: userGuid}, function (cart) {

        var byOwnerGuid = _.groupBy(cart.items, 'ownerGuid');

        var orders = _.reduce(byOwnerGuid, function (result, items, ownerGuid) {
          result.push({
            lessorGuid: ownerGuid,
            items: items,
            total: _.sumBy(items, 'itemTotal'),
            legals: [false, false, false]
          });
          return result;
        }, []);

        $scope.orders = _.forEach(orders, function (order) {
          Lessors.get({lessorGuid: order.lessorGuid}, function (lessor) {
            order.lessor = lessor;
          }, function (res) {
            Alert.error('Fehler beim Laden des Vermieters: ' + res.data.message);
          });
        });

        Lessees.get({lesseeGuid: userGuid}, function (res) {
          _.forEach($scope.orders, function (order) {
            order.lessee = res;
            console.log(res);
          })
        }, function (res) {
          Alert.error('Fehler beim Laden des Mieters: ' + res.data.message);
        });

      }, function (res) {
        Alert.error('Fehler beim Laden des Warenkorbes: ' + res.data.message);
      });

      $scope.canPlaceOrder = function (order) {
        return _.every(order.legals);
      };

      $scope.placeOrder = function () {
        Alert.error('Diese Funktion wurde noch nicht implementiert.');
      };
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
  .controller('ShopCartCtrl', ['_', '$scope', 'userGuid', 'UsersCart', 'UsersCartItems', 'ShopItemsAvailabilityCheck', 'Alert', '$timeout', '$state',
    function (_, $scope, userGuid, UsersCart, UsersCartItems, ShopItemsAvailabilityCheck, Alert, $timeout, $state) {

      var checkAvailability = function (item) {
        item.availabilityChecking = true;
        $timeout(function () {
          ShopItemsAvailabilityCheck.post(item, function (res) {
            item.isAvailable = res.isAvailable;
            item.availabilityChecking = false;
          }, function (res) {
            item.isAvailable = false;
            item.availabilityChecking = false;
            Alert.error('Fehler beim Prüfen der Verfügbarkeit: ' + res.data.message);
          });
        }, 100);
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
        UsersCartItems.delete({userGuid: userGuid, cartItemGuid: item.cartItemGuid}, function () {
          var idx = $scope.cart.items.indexOf(item);
          $scope.cart.items.splice(idx, 1);
          $scope.cartCleared = $scope.cart.items.length === 0;
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

      $scope.canGoToCheckout = function () {
        if (!$scope.cart) {
          return false;
        }
        return _.every($scope.cart.items, function (item) {
          return !item.editing && item.isAvailable && !item.availabilityChecking;
        })
      };

      $scope.goToCheckout = function () {
        if (!$scope.canGoToCheckout()) {
          return;
        }
        $state.go('checkout');
      };

      $scope.clearCart = function () {
        $scope.clearingCart = true;
        UsersCart.delete({userGuid: userGuid}, function () {
          $scope.clearingCart = false;
          $scope.cart.items = [];
          $scope.cartCleared = true;
        }, function (res) {
          $scope.clearingCart = false;
          Alert.error('Fehler beim Leeren des Warenkorbs: ' + res.data.message);
        });
      };
    }
  ]);
