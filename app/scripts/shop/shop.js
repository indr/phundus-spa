'use strict';

(function () {
  angular.module('phundusApp')
    .config(function ($stateProvider) {
      $stateProvider
        .state('public.index', {
          url: '/',
          templateUrl: 'views/shop/index.html',
          controller: 'ShopIndexCtrl'
        })
        .state('public.shop-item', {
          url: '/shop/:itemId',
          templateUrl: 'views/shop/shop-item-page.html',
          controller: 'ShopItemCtrl',
          resolve: {
            itemId: ['$stateParams', function ($stateParams) {
              return $stateParams.itemId;
            }],
            $uibModalInstance: function () {
              return null;
            }
          }
        })
    });
})();
