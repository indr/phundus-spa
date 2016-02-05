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
  .controller('ShopItemCtrl', ['$scope', 'itemId', 'ShopItems', 'Lessors', 'Alert',
    function ($scope, itemId, ShopItems, Lessors, Alert) {
      $scope.itemId = itemId;

      ShopItems.get({itemId: itemId}, function (res) {
        $scope.item = res;

        Lessors.get({lessorId: res.lessor.lessorId}, function (res) {
          $scope.lessor = res;
        }, function (res) {
          Alert.error('Fehler beim Laden des Vermieters: ' + res.data.message);
        });
      }, function (res) {
        Alert.error('Fehler beim Laden des Artikels: ' + res.data.message);
      });
    }
  ]);


angular.module('phundusApp')
  .controller('ShopCheckoutCtrl', ['_', '$scope', 'userId', 'UsersCart', 'Lessors', 'Lessees', 'ShopOrders', 'Alert',
    function (_, $scope, userId, UsersCart, Lessors, Lessees, ShopOrders, Alert) {
      UsersCart.get({userId: userId}, function (cart) {

        var byOwnerId = _.groupBy(cart.items, 'ownerId');

        var orders = _.reduce(byOwnerId, function (result, items, ownerId) {
          result.push({
            lessorId: ownerId,
            items: items,
            total: _.sumBy(items, 'itemTotal'),
            legal_notice: false
          });
          return result;
        }, []);

        $scope.orders = _.forEach(orders, function (order) {
          Lessors.get({lessorId: order.lessorId}, function (lessor) {
            order.lessor = lessor;
          }, function (res) {
            Alert.error('Fehler beim Laden des Vermieters: ' + res.data.message);
          });
        });

        Lessees.get({lesseeId: userId}, function (res) {
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
        return order.legal_notice;
      };

      $scope.placeOrder = function (order) {
        order.placing = true;
        ShopOrders.post({lessorId: order.lessorId}, function () {
          order.placing = false;
          order.placed = true;
        }, function (res) {
          order.placing = false;
          order.placed = false;
          Alert.error('Fehler beim Bestellen der Materialien: ' + res.data.message);
        });
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
  .controller('ShopCartCtrl', ['_', '$scope', 'userId', 'UsersCart', 'UsersCartItems', 'ShopItemsAvailabilityCheck', 'Alert', '$timeout', '$state',
    function (_, $scope, userId, UsersCart, UsersCartItems, ShopItemsAvailabilityCheck, Alert, $timeout, $state) {

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

      UsersCart.get({userId: userId}, function (res) {
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

        UsersCartItems.patch({userId: userId, cartItemId: item.cartItemId}, item,
          function () {
            item.editing = false;
            $scope.calculateDaysAndItemTotal(item);
            checkAvailability(item);
          }, function (res) {
            Alert.error(res.data.message);
          });
      };

      $scope.removeItem = function (item) {
        UsersCartItems.delete({userId: userId, cartItemId: item.cartItemId}, function () {
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
        UsersCart.delete({userId: userId}, function () {
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
