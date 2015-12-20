'use strict';

/**
 * @ngdoc overview
 * @name phundusApp
 * @description
 * # phundusApp
 *
 * Main module of the application.
 */
var app = angular
  .module('phundusApp', [
    'leaflet-directive',

    //'ngAnimate',
    'ngCookies',
    //'ngMessages',
    //'ngResource',
    //'ngRoute',
    //'ngSanitize',
    //'ngTouch',
    'smart-table',
    'ui.gravatar',
    'ui.router',
    'uuid',
    'xeditable'
  ])

  // http://snippetrepo.com/snippets/lodash-in-angularjs
  //.factory('_', ['$window',
  //  function ($window) {
  //    // place lodash include before angular
  //    return $window._;
  //  }
  //])
  .constant('_', window._)
  .constant('$', window.$)

  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    var access = window.routingConfig.accessLevels;

    // Public routes
    $stateProvider
      .state('public', {
        abstract: true,
        template: '<ui-view/>',
        data: {
          access: access.public
        }
      })
      .state('public.shop', {
        url: '/',
        template: '<ui-view />',
        controller: 'ShopCtrl'
      })
      .state('public.404', {
        url: '/404',
        templateUrl: 'views/404.html'
      })
      .state('public.debug', {
        url: '/debug',
        templateUrl: 'views/debug.html',
        controller: 'DebugCtrl'
      });

    // Anonymous routes
    $stateProvider
      .state('anon', {
        abstract: true,
        template: "<ui-view/>",
        data: {
          access: access.anon
        }
      })
      .state('anon.register', {
        url: '/register',
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .state('anon.login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('anon.logout', {
        url: '/logout',
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl'
      })
      .state('anon.goodbye', {
        url: '/goodbye',
        templateUrl: 'views/goodbye.html'
      });

    // User routes
    $stateProvider
      .state('users', {
        abstract: true,
        url: '/users/:userId',
        templateUrl: 'views/users.html',
        data: {
          access: access.user
        },
        controller: 'UsersCtrl',
        resolve: {
          userId: ['$stateParams', function ($stateParams) {
            return $stateParams.userId;
          }]
        }
      })
      .state('users.home', {
        url: '',
        templateUrl: 'views/users/home.html',
        controller: 'UsersHomeCtrl'
      })
      .state('users.articles', {
        abstract: true,
        template: '<ui-view></ui-view>'
      })
      .state('users.articles.index', {
        url: '/articles',
        templateUrl: 'views/users/articles.html',
        controller: 'UsersArticlesCtrl'
      })
      .state('users.articles.article', {
        abstract: true,
        url: '/articles/{articleId:[^/]+}',
        templateUrl: 'views/users/article-pills.html',
        controller: 'UsersArticlesArticleCtrl',
        resolve: {
          articleId: ['$stateParams', function ($stateParams) {
            return $stateParams.articleId;
          }]
        }
      })
      .state('users.articles.article.details', {
        url: '',
        template: '<p>users.article.details</p>',
        controller: 'UsersArticlesArticleDetailsCtrl'
      })
      .state('users.articles.article.files', {
        url: '/files',
        template: '<p>users.article.files</p>',
        controller: 'UsersArticlesArticleFilesCtrl'
      })
      .state('users.articles.article.categories', {
        url: '/categories',
        template: '<p>users.article.categories</p>',
        controller: 'UsersArticlesArticleCategoriesCtrl'
      })
      .state('users.orders', {
        url: '/orders',
        templateUrl: 'views/users/orders.html',
        controller: 'UsersOrdersCtrl'
      });
    //.state('users.contracts', {
    //  url: '/orders',
    //  templateUrl: 'views/users/contracts.html',
    //  controller: 'UsersContractsCtrl'
    //});

    // Admin routes
    $stateProvider
      .state('admin', {
        abstract: true,
        template: "<ui-view/>",
        data: {
          access: access.admin
        }
      })
      .state('admin.admin', {
        url: '/admin',
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      });

    $urlRouterProvider.otherwise('/404');

    $locationProvider.html5Mode(false);

    $urlRouterProvider.rule(function ($injector, $location) {
      if ($location.protocol() === 'file') {
        return;
      }

      if ($location.path() !== '') {
        return;
      }

      return '/';
    });


    $httpProvider.interceptors.push(function ($q, $location) {
      return {
        'responseError': function (response) {
          if (response.status === 401 || response.status === 403) {
            $location.search('returnPath', encodeURI($location.path()));
            $location.path('/login');
          }
          return $q.reject(response);
        }
      };
    });
  });

angular.module('phundusApp').filter('orderStatusText', function () {
  return function (input) {
    return {
      "Pending": "Provisorisch", "Approved": "Bestätigt", "Rejected": "Abgelehnt", "Closed": "Abgeschlossen"
    }
      [input];
  };
});


app.run(['$rootScope', '$state', 'editableOptions', function ($rootScope, $state, editableOptions) {

  $rootScope.$state = $state;

  editableOptions.theme = 'bs3';
}]);
