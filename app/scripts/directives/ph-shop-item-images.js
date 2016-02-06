'use strict';

angular.module('phundusApp')
  .directive('phShopItemImages', [
    function () {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          images: '='
        },
        templateUrl: 'views/directives/ph-shop-item-images.html',
        link: function (scope) {

          scope.$watch('images', function (images) {
            if (!images) {
              return;
            }
            var slides = scope.slides = [];
            var currIndex = 0;


            images.forEach(function (image) {
              slides.push({
                image: image.url,
                id: currIndex++
              });
            });
          });
        }
      }
    }]);

angular.module('phundusApp')
  .directive('phShopItemDocuments', [
    function () {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          documents: '='
        },
        templateUrl: 'views/directives/ph-shop-item-documents.html'
      }
    }]);

angular.module('phundusApp')
  .directive('phShopItemAvailability', ['ShopItemAvailability', 'Alert',
    function (ShopItemAvailability, Alert) {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          itemId: '='
        },
        templateUrl: 'views/directives/ph-shop-item-availability.html',
        link: function (scope) {
          ShopItemAvailability.get({itemId: scope.itemId}, function (res) {
            scope.availabilities = res.result;
          }, function (res) {
            Alert.error('Fehler beim Laden der Verfügbarkeit: ' + res.data.message);
          });
        }
      }
    }]);

angular.module('phundusApp')
  .directive('phShopItemAddToCart', ['_', '$filter', 'ShopItemsAvailabilityCheck', 'UsersCartItems', 'Alert', 'Auth', 'PriceCalculator',
    function (_, $filter, ShopItemsAvailabilityCheck, UsersCartItems, Alert, Auth, priceCalculatorFactory) {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          item: '='
        },
        templateUrl: 'views/directives/ph-shop-item-add-to-cart.html',
        link: function (scope) {

          var priceCalculator = null;

          var formModel = scope.addToCartFormModel = {
            userId: Auth.user.userId,
            fromUtc: new Date(),
            toUtc: new Date(),
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

            priceCalculator = priceCalculatorFactory(item.lessor.lessorId, item.publicPrice, item.memberPrice);
            formModel.itemId = formModel.articleId = item.itemId;
            formModel.pricePerWeek = $filter('number')(priceCalculator.getPrice(), 2);
            checkAvailability(formModel);
          });

          var checkAvailability = function (item) {
            item.availabilityChecking = true;
            var requestContent = _.pick(item, ['articleId', 'itemId', 'fromUtc', 'toUtc', 'quantity']);

            ShopItemsAvailabilityCheck.post(requestContent, function (res) {
              item.isAvailable = res.isAvailable;
              item.availabilityChecking = false;
            }, function (res) {
              item.isAvailable = false;
              item.availabilityChecking = false;
              Alert.error('Fehler beim Prüfen der Verfügbarkeit: ' + res.data.message);
            });

          };

          scope.checkAvailability = checkAvailability;

          scope.submit = function () {

            var requestContent = _.pick(formModel, ['fromUtc', 'toUtc', 'quantity']);
            requestContent.articleGuid = formModel.itemId;
            requestContent.userId = Auth.user.userId;

            UsersCartItems.post(requestContent, function () {
              Alert.success('Der Artikel wurde erfolgreich dem Warenkorb hinzugefügt.');
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
  ]);
