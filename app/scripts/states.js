'use strict';

(function () {
  angular.module('phundusApp')
    .config(states);

  states.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];

  function states($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    var access = window.routingConfig.accessLevels;

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
      .state('public.feedback', {
        url: '/feedback',
        templateUrl: 'views/feedback.html',
        controller: 'MetaFeedbackCtrl',
        title: 'Feedback'
      })
      .state('public.debug', {
        url: '/debug',
        templateUrl: 'views/debug.html',
        controller: 'DebugCtrl'
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
