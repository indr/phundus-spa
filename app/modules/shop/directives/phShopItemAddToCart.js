(function () {
  'use strict';

  angular.module('ph.shop')
    .directive('phShopItemAddToCart', phShopItemAddToCart);


  function phShopItemAddToCart() {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        item: '=',
        added: '='
      },
      templateUrl: 'modules/shop/views/directives/ph-shop-item-add-to-cart.html',
      controller: controller
    };

    function controller(_, $, $scope, $filter, $timeout, Auth, Alert, Shop, priceCalculatorFactory, ShopItemsAvailabilityCheck, UsersCartItems) {
      var formModel = null;
      var priceCalculator = null;
      var product = null;

      $scope.checkAvailability = checkAvailability;
      $scope.submit = submit;
      $scope.total = total;

      $scope.$watch('item', onItemChanged);
      $scope.$watch('addToCartFormModel.fromUtc', onAvailabilityRelatedValueChanged);
      $scope.$watch('addToCartFormModel.toUtc', onAvailabilityRelatedValueChanged);
      $scope.$watch('addToCartFormModel.quantity', onAvailabilityRelatedValueChanged);

      activate();

      function activate() {
        formModel = $scope.addToCartFormModel = {
          userId: Auth.user.userId,
          fromUtc: Shop.fromUtc,
          toUtc: Shop.toUtc,
          quantity: 1,
          isAvailable: false,
          availabilityChecking: true
        };

        $timeout(delayedActivate, 500);
      }

      function delayedActivate() {
        $scope.addToCartForm.$setPristine(false);
        $scope.addToCartForm.$setDirty(true);

        checkAvailability();
      }

      function onItemChanged(newValue) {
        if (!newValue) {
          return;
        }

        product = newValue;
        priceCalculator = priceCalculatorFactory(product.lessor.lessorId, product.publicPrice, product.memberPrice);
        formModel.itemId = formModel.articleId = product.itemId;
        formModel.pricePerWeek = $filter('number')(priceCalculator.getPrice(), 2);
      }

      function onAvailabilityRelatedValueChanged(newValue, oldValue) {
        if (oldValue === undefined) {
          return;
        }

        checkAvailability();
      }

      function checkAvailability() {
        var formModel = $scope.addToCartFormModel;
        if (!formModel) {
          return;
        }

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
      }

      function submit() {
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
          if ($scope.added) {
            $scope.added();
          }

          $('#popover-glyphicon-cart').popover('show');
          $timeout(function () {
            $('#popover-glyphicon-cart').popover('hide');
          }, 3000);

        }, function (res) {
          Alert.error('Fehler beim Hinzufügen des Artikels in den Warenkorb: ' + res.data.message);
        })
      }

      function total() {
        if (!priceCalculator) {
          return;
        }
        return priceCalculator.getTotal(formModel.fromUtc, formModel.toUtc, formModel.quantity, true);
      }
    }
  }
})();
