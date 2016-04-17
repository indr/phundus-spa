(function () {
  'use strict';

  angular.module('ph.shop')
    .controller('ShopCheckoutCtrl', ShopCheckoutCtrl);


  ShopCheckoutCtrl.$inject = ['_', '$scope', 'userId', 'UsersCart', 'shopLessorsResource', 'Lessees', 'ShopOrders', 'Alert'];

  function ShopCheckoutCtrl(_, $scope, userId, UsersCart, Lessors, Lessees, ShopOrders, Alert) {
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
})();
