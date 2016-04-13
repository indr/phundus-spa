'use strict';

(function () {
  var module = angular.module('ph.users', [
    'ph.inventory',
    'ph.orders',
    'ph.stores']);

  module.config(states);

  states.$inject = ['$stateProvider', 'authProvider'];
  
  function states($stateProvider, authProvider) {

    var access = authProvider.accessLevels;

    $stateProvider
      .state('user', {
        abstract: true,
        url: '/users/:userId',
        data: {
          access: access.user
        },
        template: '<ph-user-navbar data-user-id="userId"></ph-user-navbar><ui-view/>',
        controller: 'UserCtrl',
        resolve: {
          userId: ['$stateParams', function ($stateParams) {
            return $stateParams.userId;
          }],
          tenantId: ['$stateParams', function ($stateParams) {
            return $stateParams.userId;
          }]
        }
      })
      .state('user.home', {
        url: '',
        data: {
          access: access.public
        },
        templateUrl: templateUrl('home.html'),
        controller: 'UserHomeCtrl'
      })

      .state('user.products', {
        url: '/products/',
        templateUrl: templateUrl('products.html'),
        controller: 'UserProductsCtrl'
      })
      .state('user.product', {
        abstract: true,
        url: '/products/:articleId/:articleShortId',
        template: '<ph-user-article-navbar data-user-id="userId" data-article-id="articleId" data-article-short-id="articleShortId"></ph-user-article-navbar><ui-view/>',
        controller: ['$scope', 'userId', 'articleId', 'articleShortId',
          function ($scope, userId, articleId, articleShortId) {
            $scope.userId = userId;
            $scope.articleId = articleId;
            $scope.articleShortId = articleShortId;
            $scope.tenantId = userId;
            $scope.productId = articleId;
          }],
        resolve: {
          articleId: ['$stateParams', function ($stateParams) {
            return $stateParams.articleId || $stateParams.productId;
          }],
          articleShortId: ['$stateParams', function ($stateParams) {
            return $stateParams.articleShortId;
          }],
          productId: ['$stateParams', function ($stateParams) {
            return $stateParams.articleId || $stateParams.productId;
          }]
        }
      })
      .state('user.product.actions', {
        url: '/actions',
        template: '<view-title>Aktivitäten</view-title><div ph-inventory-product-activities tenant-id="tenantId" product-id="productId"></div>'
      })
      .state('user.product.details', {
        url: '/',
        template: '<view-title>Material bearbeiten</view-title><div ph-inventory-product-details tenant-id="tenantId" product-id="productId" has-member-price="false"></div>'
      })
      .state('user.product.description', {
        url: '/description',
        template: '<view-title>Beschreibung bearbeiten</view-title><div ph-inventory-product-description tenant-id="tenantId" product-id="productId"></div>'
      })
      .state('user.product.specification', {
        url: '/specification',
        template: '<view-title>Spezifikation bearbeiten</view-title><div ph-inventory-product-specification tenant-id="tenantId" product-id="productId"></div>'
      })
      .state('user.product.stock', {
        url: '/stock',
        template: '<view-title>Bestand</view-title><div ph-inventory-product-stock tenant-id="tenantId" product-id="productId"></div>'
      })
      .state('user.product.files', {
        url: '/files',
        template: '<view-title>Dateien</view-title><div ph-inventory-product-files tenant-id="tenantId" product-id="productId"></div>'
      })

      .state('user.orders', {
        abstract: true,
        url: '/orders',
        template: '<ui-view/>'
      })
      .state('user.orders.index', {
        url: '/',
        templateUrl: templateUrl('orders.html'),
        controller: 'UserOrdersCtrl'
      })
      .state('user.orders.order', {
        url: '/{orderId}',
        templateUrl: templateUrl('order.html'),
        controller: 'UserOrderCtrl',
        resolve: {
          orderId: ['$stateParams', function ($stateParams) {
            return $stateParams.orderId;
          }]
        }
      });

    function templateUrl(fileName) {
      return 'modules/users/views/' + fileName;
    }
  }
})();
