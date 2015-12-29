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
    'ngSanitize',
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
      .state('public.organizations', {
        url: '/organizations',
        templateUrl: 'views/organizations.html',
        controller: 'OrganizationsCtrl'
      })
      .state('public.organization', {
        url: '/organizations/:organizationId',
        templateUrl: 'views/organization.html',
        controller: 'OrganizationCtrl',
        resolve: {
          organizationId: ['$stateParams', function ($stateParams) {
            return $stateParams.organizationId;
          }]
        }
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
        template: '<ph-user-navbar data-user-id="userId"></ph-user-navbar><ui-view/>',
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
        url: '/articles',
        template: '<ui-view/>'
      })
      .state('users.articles.index', {
        url: '/',
        templateUrl: 'views/users/articles.html',
        controller: 'UsersArticlesIndexCtrl'
      })
      .state('users.articles.new', {
        url: '/new',
        templateUrl: 'views/manage/create-article.html',
        controller: 'UsersArticlesNewCtrl'
      })
      .state('users.articles.details', {
        url: '/:articleId',
        template: '<p>article details</p>'
      })
    ;

      /*
      .state('users.articles', {
        abstract: true,
        template: '<ui-view></ui-view>'
      });


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
      */

    // Management routes
    $stateProvider
      .state('manage', {
        abstract: true,
        template: '<ui-view/>',
        data: {
          access: access.manager
        }
      })
      .state('manage.articles', {
        url: '/organizations/{organizationId}/articles',
        templateUrl: 'views/manage/articles.html',
        controller: 'ManageArticlesCtrl',
        resolve: {
          organizationId: ['$stateParams', function ($stateParams) {
            return $stateParams.organizationId;
          }]
        }
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
            $location.path('/#/login');
          }
          else if (response.status === 404) {
            $location.path('/#/404');
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

app.run(['$rootScope', '$state', 'Auth', 'Alert', 'editableOptions',
  function ($rootScope, $state, Auth, Alert, editableOptions) {

    $rootScope.$state = $state;
    editableOptions.theme = 'bs3';

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState/*, fromParams*/) {
      if(!('data' in toState) || !('access' in toState.data)){
        //$rootScope.error = "Access undefined for this state";
        Alert.error('Access undefined for this state.');
        event.preventDefault();
      }
      else if (!Auth.authorize(toState.data.access, undefined, toParams.organizationId)) {
        //$rootScope.error = "Seems like you tried accessing a route you don't have access to...";
        Alert.error('Seems like you tried accessing a route you don\'t have access to...');
        event.preventDefault();

        if (fromState.url === '^') {
          if (Auth.isLoggedIn()) {
            //$state.go('user.home');
            $state.go('anon.login')
          } else {
            //$rootScope.error = null;
            $state.go('anon.login');
          }
        }
      }
    });
  }
]);
