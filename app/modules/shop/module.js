'use strict';

(function () {
  angular.module('ph.shop', [
      'ngResource',
      'ui.router',
      'ph.auth',
      'ph.ui']
  ).config(states);

  states.$inject = ['$stateProvider', 'authProvider'];
  function states($stateProvider, authProvider) {

    var access = authProvider.accessLevels;

    $stateProvider
      .state('public.index', {
        url: '/',
        templateUrl: templateUrl('index.html'),
        controller: 'ShopCtrl'
      })
      .state('public.shop-item', {
        url: '/shop/:itemId',
        templateUrl: templateUrl('shop-item-page.html'),
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
      .state('cart', {
        url: '/cart',
        data: {
          access: access.user
        },
        templateUrl: templateUrl('cart.html'),
        controller: 'ShopCartCtrl',
        resolve: {
          userId: ['Auth', function (Auth) {
            return Auth.user.userId;
          }]
        }
      })
      .state('checkout', {
        url: '/checkout',
        data: {
          access: access.user
        },
        templateUrl: templateUrl('checkout.html'),
        controller: 'ShopCheckoutCtrl',
        resolve: {
          userId: ['Auth', function (Auth) {
            return Auth.user.userId;
          }]
        }
      });

    function templateUrl(fileName) {
      return 'modules/shop/views/' + fileName;
    }
  }
})();
