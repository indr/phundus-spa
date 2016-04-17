(function () {
  'use strict';

  angular.module('ph.shop')
    .directive('phShopItemAddToCart', phShopItemAddToCart);


  phShopItemAddToCart.$inject = ['_', '$', '$filter', 'ShopItemsAvailabilityCheck', 'UsersCartItems', 'Alert', 'Auth', 'PriceCalculator', 'Shop', '$timeout'];

  function phShopItemAddToCart(_, $, $filter, ShopItemsAvailabilityCheck, UsersCartItems, Alert, Auth, priceCalculatorFactory, Shop, $timeout) {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        item: '=',
        added: '='
      },
      templateUrl: 'modules/shop/views/directives/ph-shop-item-add-to-cart.html',
      link: function (scope) {

        var priceCalculator = null;
        var product = null;

        var formModel = scope.addToCartFormModel = {
          userId: Auth.user.userId,
          fromUtc: Shop.fromUtc,
          toUtc: Shop.toUtc,
          quantity: 1,
          isAvailable: false,
          availabilityChecking: false
        };

        scope.addToCartForm.$setPristine(false);
        scope.addToCartForm.$setDirty(true);

        scope.$watch('item', function (item) {
          if (!item) {
            return;
          }

          product = item;
          priceCalculator = priceCalculatorFactory(item.lessor.lessorId, item.publicPrice, item.memberPrice);
          formModel.itemId = formModel.articleId = item.itemId;
          formModel.pricePerWeek = $filter('number')(priceCalculator.getPrice(), 2);
          checkAvailability();
        });

        var checkAvailability = function () {

          if (formModel.itemId === undefined) {
            return;
          }
          if (formModel.toUtc < formModel.fromUtc) {
            formModel.isAvailable = false;
            return;
          }

          formModel.availabilityChecking = true;
          var requestContent = _.pick(formModel, ['articleId', 'itemId', 'fromUtc', 'toUtc', 'quantity']);

          ShopItemsAvailabilityCheck.post(requestContent, function (res) {
            formModel.isAvailable = res.isAvailable;
            formModel.availabilityChecking = false;
          }, function (res) {
            formModel.isAvailable = false;
            formModel.availabilityChecking = false;
            Alert.error('Fehler beim Prüfen der Verfügbarkeit: ' + res.data.message);
          });

        };

        scope.checkAvailability = checkAvailability;

        scope.$watch('addToCartFormModel.fromUtc', checkAvailability);
        scope.$watch('addToCartFormModel.toUtc', checkAvailability);
        scope.$watch('addToCartFormModel.quantity', checkAvailability);

        scope.submit = function () {

          if (formModel.availabilityChecking || !formModel.isAvailable) {
            Alert.error('Das Material ist im gewählten Zeitraum mit dieser Menge nicht verfügbar.');
            return;
          }

          var rq = _.pick(formModel, ['fromUtc', 'toUtc', 'quantity']);
          rq.lessorId = product.lessor.lessorId;
          rq.productId = product.itemId;
          rq.userId = Auth.user.userId;

          UsersCartItems.post(rq, function () {
            Shop.fromUtc = rq.fromUtc;
            Shop.toUtc = rq.toUtc;
            if (scope.added) {
              scope.added();
            }

            $('#popover-glyphicon-cart').popover('show');
            $timeout(function () {
              $('#popover-glyphicon-cart').popover('hide');
            }, 3000);

          }, function (res) {
            Alert.error('Fehler beim Hinzufügen des Artikels in den Warenkorb: ' + res.data.message);
          })
        };

        scope.total = function () {
          if (!priceCalculator) {
            return;
          }
          return priceCalculator.getTotal(formModel.fromUtc, formModel.toUtc, formModel.quantity, true);
        };
      }
    }
  }
})();
