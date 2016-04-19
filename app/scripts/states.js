(function () {
  'use strict';

  angular.module('ph.app')
    .config(states);

  states.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'authProvider'];
  function states($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, authProvider) {

    var access = authProvider.accessLevels;

    $stateProvider
      .state('anon', {
        abstract: true,
        template: "<ui-view/>",
        data: {
          access: access.anon
        }
      })
      .state('public', {
        abstract: true,
        template: '<ui-view/>',
        data: {
          access: access.public
        }
      })
      .state('public.404', {
        url: '/404',
        templateUrl: 'views/404.html'
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
            $location.path('/#/login');
          }
          //else if (response.status === 404) {
          //  $location.path('/#/404');
          //}
          return $q.reject(response);
        }
      };
    });
  }
})();
