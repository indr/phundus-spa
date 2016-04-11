'use strict';

(function () {
  angular.module('phundusApp')
    .controller('ShopCartCtrl', CartCtrl);

  CartCtrl.$inject = ['_', '$scope', 'userId', 'UsersCart', 'UsersCartItems', 'ShopItemsAvailabilityCheck', 'ShopProductsAvailabilityCheck', 'Alert', '$timeout', '$state'];

  function CartCtrl(_, $scope, userId, UsersCart, UsersCartItems, ShopItemsAvailabilityCheck, ShopProductsAvailabilityCheck, Alert, $timeout, $state) {

    var cart = null;

    var checkAvailability = function (productId, items) {
      _.forEach(items, function (each) {
        each.availabilityChecking = true;
      });

      var rq = {
        productId: productId,
        items: _.map(items, function (each) {
          var result = _.pick(each, ['fromUtc', 'toUtc', 'quantity']);
          result.correlationId = each.cartItemId;
          return result;
        })
      };

      ShopProductsAvailabilityCheck.post(rq, function (res) {
        _.forEach(res.items, function (each) {
          var item = _.find(items, {'cartItemId': each.correlationId});
          if (item) {
            item.isAvailable = each.isAvailable;
            item.availabilityChecking = false;
          }
        });
      }, function (res) {
        _.forEach(items, function (each) {
          each.isAvailable = false;
          each.availabilityChecking = false;
        });
        Alert.error('Fehler beim Prüfen der Verfügbarkeit: ' + res.data.message);
      });
    };


    var checkAllAvailabilities = function (items) {
      if (!items) {
        return;
      }

      var groups = _.groupBy($scope.cart.items, 'productId');
      _.forEach(groups, function (items, productId) {
        checkAvailability(productId, items);
      });
    };

    $scope.checkAvailability = function (item) {
      if (!item) {
        return;
      }

      var productId = item.productId;
      var items = _.filter(cart.items, {'productId': productId});
      if (items.length === 0) {
        return;
      }
      checkAvailability(productId, items);
    };


    UsersCart.get({userId: userId}, function (res) {
      $scope.cart = cart = res;
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
          $scope.checkAvailability(item);
        }, function (res) {
          Alert.error(res.data.message);
        });
    };

    $scope.removeItem = function (item) {
      UsersCartItems.delete({userId: userId, cartItemId: item.cartItemId}, function () {
        var idx = $scope.cart.items.indexOf(item);
        $scope.cart.items.splice(idx, 1);
        $scope.cartCleared = $scope.cart.items.length === 0;
        $scope.checkAvailability(item);
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
})();
