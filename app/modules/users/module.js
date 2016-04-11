'use strict';

(function () {
  angular.module('phundusApp')
    .config(states);

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
        controller: 'UsersCtrl',
        resolve: {
          userId: ['$stateParams', function ($stateParams) {
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
        controller: 'UsersHomeCtrl'
      })

      .state('user.articles', {
        abstract: true,
        url: '/articles',
        template: '<ui-view/>'
      })
      .state('user.articles.index', {
        url: '/',
        templateUrl: templateUrl('articles.html'),
        controller: 'UsersArticlesIndexCtrl'
      })
      .state('user.articles.article', {
        abstract: true,
        url: '/articles/:articleId/:articleShortId',
        template: '<ph-user-article-navbar data-user-id="userId" data-article-id="articleId" data-article-short-id="articleShortId"></ph-user-article-navbar><ui-view/>',
        controller: ['$scope', 'userId', 'articleId', 'articleShortId',
          function ($scope, userId, articleId, articleShortId) {
            $scope.userId = userId;
            $scope.articleId = articleId;
            $scope.articleShortId = articleShortId;
          }],
        resolve: {
          articleId: ['$stateParams', function ($stateParams) {
            return $stateParams.articleId;
          }],
          articleShortId: ['$stateParams', function ($stateParams) {
            return $stateParams.articleShortId;
          }]
        }
      })
      .state('user.articles.article.actions', {
        url: '/actions',
        templateUrl: templateUrl('article-actions.html'),
        controller: 'ArticlesActionsCtrl'
      })
      .state('user.articles.article.details', {
        url: '/',
        templateUrl: templateUrl('edit-article-details.html'),
        controller: 'UsersArticlesDetailsCtrl'
      })
      .state('user.articles.article.description', {
        url: '/description',
        templateUrl: templateUrl('edit-article-description.html'),
        controller: 'UsersArticlesDescriptionCtrl'
      })
      .state('user.articles.article.specification', {
        url: '/specification',
        templateUrl: templateUrl('edit-article-specification.html'),
        controller: 'UsersArticlesSpecificationCtrl'
      })
      .state('user.articles.article.stock', {
        url: '/stock',
        templateUrl: templateUrl('edit-article-stock.html'),
        controller: 'UsersArticlesStockCtrl'
      })
      .state('user.articles.article.files', {
        url: '/files',
        templateUrl: templateUrl('edit-article-files.html'),
        controller: 'UsersArticlesFilesCtrl'
      })

      .state('user.orders', {
        abstract: true,
        url: '/orders',
        template: '<ui-view/>'
      })
      .state('user.orders.index', {
        url: '/',
        templateUrl: templateUrl('orders.html'),
        controller: 'ManageUserOrdersCtrl'
      })
      .state('user.orders.order', {
        url: '/{orderId}',
        templateUrl: templateUrl('order.html'),
        controller: 'ManageUserOrderCtrl',
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
