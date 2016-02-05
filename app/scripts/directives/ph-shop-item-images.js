'use strict';

angular.module('phundusApp')
  .directive('phShopItemImages', [function () {
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
  .directive('phShopItemDocuments', [function () {
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
  .directive('phShopItemAvailability', ['ShopItemAvailability', 'Alert', function (ShopItemAvailability, Alert) {
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
