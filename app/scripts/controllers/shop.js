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
        $window.location.href = '#/shop';
      }, 0);
    }
  ]);

angular.module('phundusApp')
  .controller('ShopIndexCtrl', ['$scope', 'ShopItems', 'Alert', '$uibModal',
    function ($scope, ShopItems, Alert, $uibModal) {

      $scope.currentPage = 1;
      $scope.limit = 8;

      var filter = {
        searchQuery: null,
        lessorId: null
      };

      var getItems = function () {
        ShopItems.get({
          q: filter.searchQuery,
          lessorId: filter.lessorId,
          offset: $scope.limit * ($scope.currentPage - 1),
          limit: $scope.limit
        }, function (res) {
          $scope.offset = res.offset;
          $scope.limit = res.limit;
          $scope.totalItems = res.total;
          $scope.currentPage = Math.ceil(($scope.offset + 1) / $scope.limit);
          $scope.items = res.results;


        }, function (res) {
          Alert.error('Fehler beim Laden der Artikel: ' + res.data.message);
        });
      };

      $scope.searchQuery = function (searchQuery, lessorId) {
        filter.searchQuery = searchQuery;
        filter.lessorId = lessorId;
        $scope.currentPage = 1;
        getItems();
      };

      $scope.$watch('currentPage', function () {
        getItems();
      });

      $scope.showItem = function (item) {
        $uibModal.open({
          templateUrl: 'views/shop/shop-item-modal.html',
          controller: 'ShopItemCtrl',
          resolve: {
            itemId: function () {
              return item.itemId;
            }
          },
          size: 'lg'
        });
      };
    }
  ]);

angular.module('phundusApp')
  .controller('ShopItemCtrl', ['$scope', 'itemId', 'ShopItems', 'Lessors', 'Alert', 'Auth', '$uibModalInstance',
    function ($scope, itemId, ShopItems, Lessors, Alert, Auth, $uibModalInstance) {
      var lessor = null;

      $scope.isLoading = true;
      $scope.item = null;
      $scope.itemId = itemId;
      $scope.accessLevels = Auth.accessLevels;
      $scope.canEdit = false;
      $scope.canRent = false;

      ShopItems.get({itemId: itemId}, function (res) {
        $scope.item = res;
        $scope.isLoading = false;

        Lessors.get({lessorId: res.lessor.lessorId}, function (res) {
          $scope.lessor = lessor = res;

          $scope.canEdit = (Auth.user.userId === lessor.lessorId) || (Auth.isManager(lessor.lessorId));
          $scope.canRent = lessor.publicRental || Auth.isMember(lessor.lessorId);
        }, function (res) {
          Alert.error('Fehler beim Laden des Vermieters: ' + res.data.message);
        });
      }, function (res) {
        $scope.isLoading = false;
        Alert.error('Fehler beim Laden des Artikels: ' + res.data.message);
      });

      $scope.close = function () {
        if (!$uibModalInstance) {
          return;
        }
        $uibModalInstance.dismiss('cancel');
      };

      $scope.hasDocuments = function () {
        return $scope.item && $scope.item.documents.length > 0;
      };
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
  .controller('ShopCartCtrl', ['_', '$scope', 'userId', 'UsersCart', 'UsersCartItems', 'ShopItemsAvailabilityCheck', 'ShopProductsAvailabilityCheck', 'Alert', '$timeout', '$state',
    function (_, $scope, userId, UsersCart, UsersCartItems, ShopItemsAvailabilityCheck, ShopProductsAvailabilityCheck, Alert, $timeout, $state) {

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
          _.forEach(items, function (each) {
            each.isAvailable = res.isAvailable;
            each.availabilityChecking = false;
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
        if(!item) {
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
  ]);
