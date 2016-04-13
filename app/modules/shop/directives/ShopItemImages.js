'use strict';

(function () {
  angular.module('phundusApp')
    .directive('phShopItemImages', shopItemImages);

  function shopItemImages() {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        images: '='
      },
      templateUrl: 'modules/shop/views/directives/ph-shop-item-images.html',
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
  }
})();
