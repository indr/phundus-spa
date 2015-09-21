'use strict';

/**
 * @ngdoc overview
 * @name phundusApp
 * @description
 * # phundusApp
 *
 * Main module of the application.
 */
angular
  .module('phundusApp', [
    //'ngAnimate',
    'ngCookies',
    //'ngMessages',
    //'ngResource',
    //'ngRoute',
    //'ngSanitize',
    //'ngTouch',
    'ui.gravatar',
    'ui.router'
  ])

  // http://snippetrepo.com/snippets/lodash-in-angularjs
  //.factory('_', ['$window',
  //  function ($window) {
  //    // place lodash include before angular
  //    return $window._;
  //  }
  //])
  .constant('_', window._)

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
      .state('anon.login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('anon.register', {
        url: '/register',
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .state('anon.logout', {
        url: '/goodbye',
        templateUrl: 'views/logout.html'
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
        controller: 'UsersCtrl'
      })
      .state('users.home', {
        url: '',
        templateUrl: 'views/users/home.html',
        controller: 'UsersHomeCtrl'
      })
      .state('users.articles', {
        url: '/articles',
        templateUrl: 'views/users/articles.html',
        controller: 'UsersArticlesCtrl'
      })
      .state('users.orders', {
        url: '/orders',
        templateUrl: 'views/users/orders.html',
        controller: 'UsersOrdersCtrl'
      })
      .state('users.contracts', {
        url: '/orders',
        templateUrl: 'views/users/contracts.html',
        controller: 'UsersContractsCtrl'
      });

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


angular.module('phundusApp') .filter('orderStatusText', function () {
  return function (input) {
    return {
      "Pending": "Provisorisch", "Approved": "Bestätigt", "Rejected": "Abgelehnt", "Closed": "Abgeschlossen"
    }
      [input];
  };
});
