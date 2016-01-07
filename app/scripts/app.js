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
    'blueimp.fileupload',
    'leaflet-directive',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'smart-table',
    'ui.bootstrap',
    'ui.gravatar',
    'ui.router',
    'uuid',
    'mwl.confirm'
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
        templateUrl: 'views/organizations/home.html',
        controller: 'OrganizationCtrl',
        resolve: {
          organizationId: ['$stateParams', function ($stateParams) {
            return $stateParams.organizationId;
          }]
        }
      })
      .state('public.logout', {
        url: '/logout',
        templateUrl: 'views/account/logout.html',
        controller: 'LogoutCtrl'
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
      .state('anon.signup', {
        url: '/signup',
        templateUrl: 'views/account/signup.html',
        controller: 'SignUp'
      })
      .state('anon.login', {
        url: '/login',
        data: {
          access: access.public
        },
        templateUrl: 'views/account/login.html',
        controller: 'LoginCtrl'
      })
      .state('anon.loggedout', {
        url: '/logged-out',
        templateUrl: 'views/account/logged-out.html'
      });

    // User routes
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
        templateUrl: 'views/users/home.html',
        controller: 'UsersHomeCtrl'
      })
      .state('user.articles', {
        abstract: true,
        url: '/articles',
        template: '<ui-view/>'
      })
      .state('user.articles.index', {
        url: '/',
        templateUrl: 'views/users/articles.html',
        controller: 'UsersArticlesIndexCtrl'
      })
      .state('user.articles.article', {
        abstract: true,
        url: '/articles/:articleId',
        template: '<ph-user-article-navbar data-user-id="userId" data-article-id="articleId"></ph-user-article-navbar><ui-view/>',
        controller: ['$scope', 'userId', 'articleId', function ($scope, userId, articleId) {
          $scope.userId = userId;
          $scope.articleId = articleId;
        }],
        resolve: {
          articleId: ['$stateParams', function ($stateParams) {
            return $stateParams.articleId;
          }]
        }
      })
      .state('user.articles.article.details', {
        url: '/',
        templateUrl: 'views/manage/edit-article-details.html',
        controller: 'UsersArticlesDetailsCtrl'
      })
      .state('user.articles.article.description', {
        url: '/description',
        templateUrl: 'views/manage/edit-article-description.html',
        controller: 'UsersArticlesDescriptionCtrl'
      })
      .state('user.articles.article.specification', {
        url: '/specification',
        templateUrl: 'views/manage/edit-article-specification.html',
        controller: 'UsersArticlesSpecificationCtrl'
      })
      .state('user.articles.article.stock', {
        url: '/stock',
        templateUrl: 'views/manage/edit-article-stock.html',
        controller: 'UsersArticlesStockCtrl'
      })
      .state('user.articles.article.files', {
        url: '/files',
        templateUrl: 'views/manage/edit-article-files.html',
        controller: 'UsersArticlesFilesCtrl'
      })

      .state('user.orders', {
        abstract: true,
        url: '/orders',
        template: '<ui-view/>'
      })
      .state('user.orders.index', {
        url: '/',
        templateUrl: 'views/users/orders.html',
        controller: 'ManageUserOrdersCtrl'
      })
      .state('user.orders.order', {
        url: '/{orderId}',
        templateUrl: 'views/users/order.html',
        controller: 'ManageUserOrderCtrl',
        resolve: {
          orderId: ['$stateParams', function ($stateParams) {
            return $stateParams.orderId;
          }]
        }
      })
    ;

    // Management routes
    $stateProvider
      .state('manage', {
        abstract: true,
        data: {
          access: access.user
        },
        url: '/manage',
        template: '<ui-view></ui-view>'
      })
      .state('manage.organization', {
        abstract: true,
        data: {
          access: access.manager
        },
        url: '/organizations/{organizationId}',
        template: '<ph-organization-navbar data-organization-id="organizationId"></ph-organization-navbar><ui-view></ui-view>',
        controller: ['$scope', 'organizationId', function ($scope, organizationId) {
          $scope.organizationId = organizationId
        }],
        resolve: {
          organizationId: ['$stateParams', function ($stateParams) {
            return $stateParams.organizationId;
          }]
        }
      })
      .state('manage.organization.applications', {
        url: '/applications/',
        templateUrl: 'views/organizations/applications.html',
        controller: 'ManageOrganizationApplicationsCtrl'
      })
      .state('manage.organization.files', {
        url: '/files/',
        templateUrl: 'views/organizations/files.html',
        controller: ['$scope', 'organizationId',
          function ($scope, organizationId) {
            $scope.url = '/api/v0/organizations/' + organizationId + '/files';
          }
        ]
      })
      .state('manage.organization.members', {
        url: '/members/',
        templateUrl: 'views/organizations/members.html',
        controller: 'ManageOrganizationMembersCtrl'
      })
      .state('manage.organization.orders', {
        url: '/orders/',
        templateUrl: 'views/organizations/orders.html',
        controller: 'ManageOrganizationOrdersCtrl'
      })
      .state('manage.organization.order', {
        url: '/orders/{orderId}',
        templateUrl: 'views/organizations/order.html',
        controller: 'ManageOrganizationOrderCtrl',
        resolve: {
          orderId: ['$stateParams', function ($stateParams) {
            return $stateParams.orderId;
          }]
        }
      })
      .state('manage.organization.settings', {
        url: '/settings',
        controller: 'ManageOrganizationsSettingsCtrl',
        templateUrl: 'views/manage/organization-settings.html'
      })


    ;

    // Organization routes
    $stateProvider


      .state('organizations', {
        abstract: true,
        data: {
          access: access.manager
        },
        url: '/organizations/{organizationId}',
        template: '<ph-organization-navbar data-ng-show="organization" data-organization-id="organizationId"></ph-organization-navbar><ui-view/>',
        controller: ['$scope', 'organizationId', function ($scope, organizationId) {
          $scope.organizationId = organizationId
        }],
        resolve: {
          organizationId: ['$stateParams', function ($stateParams) {
            return $stateParams.organizationId;
          }]
        }
      })
      .state('organizations.stores', {
        abstract: true,
        url: '/stores',
        template: '<ph-organization-navbar data-organization-id="organizationId"></ph-organization-navbar><ui-view/>'
      })
      .state('organizations.stores.index', {
        url: '/',
        template: '<ph-store store="store" data-is-editable="true" loaded="true"></ph-store>',
        controller: 'OrganizationsStoreCtrl'
      })
      .state('organizations.articles', {
        abstract: true,
        url: '/articles',
        template: '<ph-organization-navbar data-organization-id="organizationId"></ph-organization-navbar><ui-view/>'
      })
      .state('organizations.articles.index', {
        url: '/',
        templateUrl: 'views/organizations/articles.html',
        controller: 'OrganizationsArticlesCtrl'
      })
      .state('organizations.articles.edit', {
        abstract: true,
        url: '/:articleId',
        template: '<ph-organization-article-navbar data-organization-id="organizationId" data-article-id="articleId"></ph-organization-article-navbar><ui-view/>',
        controller: ['$scope', 'organizationId', 'articleId', function ($scope, organizationId, articleId) {
          $scope.organizationId = organizationId;
          $scope.articleId = articleId;
        }],
        resolve: {
          articleId: ['$stateParams', function ($stateParams) {
            return $stateParams.articleId;
          }]
        }
      })
      .state('organizations.articles.edit.details', {
        url: '/',
        templateUrl: 'views/manage/edit-article-details.html',
        controller: 'OrganizationsArticlesDetailsCtrl'
      })
      .state('organizations.articles.edit.description', {
        url: '/description',
        templateUrl: 'views/manage/edit-article-description.html',
        controller: 'OrganizationsArticlesDescriptionCtrl'
      })
      .state('organizations.articles.edit.specification', {
        url: '/specification',
        templateUrl: 'views/manage/edit-article-specification.html',
        controller: 'OrganizationsArticlesSpecificationCtrl'
      })
      .state('organizations.articles.edit.stock', {
        url: '/stock',
        templateUrl: 'views/manage/edit-article-stock.html',
        controller: 'OrganizationsArticlesStockCtrl'
      })
      .state('organizations.articles.edit.files', {
        url: '/files',
        templateUrl: 'views/manage/edit-article-files.html',
        controller: 'OrganizationsArticlesFilesCtrl'
      });

    // Admin routes
    $stateProvider
      .state('admin', {
        abstract: true,
        template: "<ui-view/>",
        data: {
          access: access.admin
        },
        url: '/admin'
      })
      .state('admin.eventLog', {
        url: '/event-log',
        templateUrl: 'views/admin/eventlog.html',
        controller: 'AdminEventLogCtrl'
      })
      .state('admin.mails', {
        url: '/mails/',
        templateUrl: 'views/admin/mails.html',
        controller: 'AdminMailsIndexCtrl'
      })
      .state('admin.organizations', {
        url: '/organizations/',
        templateUrl: 'views/admin/organizations.html',
        controller: 'AdminOrganizationsIndexCtrl'
      })
      .state('admin.schemaUpdate', {
        url: '/schema-update',
        template: '<pre>{{schemaUpdate}}</pre>',
        controller: 'AdminSchemaUpdateCtrl'
      })
      .state('admin.users', {
        url: '/users/',
        templateUrl: 'views/admin/users.html',
        controller: 'AdminUsersIndexCtrl'
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
  });

angular.module('phundusApp')
  .config(['uibDatepickerPopupConfig',
    function (uibDatepickerPopupConfig) {
      uibDatepickerPopupConfig.clearText = 'Leeren';
      uibDatepickerPopupConfig.currentText = 'Heute';
      uibDatepickerPopupConfig.closeText = 'Schliessen';
    }
  ]);

angular.module('phundusApp')
  .config(['$httpProvider', 'fileUploadProvider',
    function ($httpProvider, fileUploadProvider) {
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
      fileUploadProvider.defaults.redirect = window.location.href.replace(
        /\/[^\/]*$/,
        '/cors/result.html?%s'
      );
    }
  ]);

angular.module('phundusApp')
  .filter('orderStatusText', function () {
    return function (input) {
      return {
        "Pending": "Provisorisch", "Approved": "Bestätigt", "Rejected": "Abgelehnt", "Closed": "Abgeschlossen"
      }
        [input];
    };
  });

angular.module('phundusApp')
  .controller('MyFileUploadCtrl', [
    '$scope', '$http', '$filter', '$window',
    function ($scope, $http) {
      var url = $scope.url;
      $scope.options = {
        url: url
      };
      $scope.loadingFiles = true;
      $http.get(url)
        .then(
        function (response) {
          $scope.loadingFiles = false;
          $scope.queue = response.data.files || [];
        },
        function () {
          $scope.loadingFiles = false;
        }
      );
    }
  ])
  .controller('FileDestroyController', ['$scope', '$http',
    function ($scope, $http) {
      var file = $scope.file,
        state;
      if (file.url) {
        file.$state = function () {
          return state;
        };
        file.$destroy = function () {
          state = 'pending';
          return $http({
            url: file.deleteUrl,
            method: file.deleteType
          }).then(
            function () {
              state = 'resolved';
              $scope.clear(file);
            },
            function () {
              state = 'rejected';
            }
          );
        };
      } else if (!file.$cancel && !file._index) {
        file.$cancel = function () {
          $scope.clear(file);
        };
      }
    }
  ]);

app.filter('unique', function () {
  return function (arr, field) {
    if (!arr) {
      return arr;
    }
    var o = {}, i, l = arr.length, r = [];
    for (i = 0; i < l; i += 1) {
      o[arr[i][field]] = arr[i];
    }
    for (i in o) {
      r.push(o[i]);
    }
    return r;
  };
});

app.run(['$rootScope', '$state', '$location', 'Auth', 'Alert', 'confirmationPopoverDefaults',
  function ($rootScope, $state, $location, Auth, Alert, confirmationPopoverDefaults) {
    $rootScope.isTestEnv = /(^localhost)|(^acceptance)/.test($location.host());
    $rootScope.isLocalEnv = /(^localhost)/.test($location.host());
    $rootScope.$state = $state;
    confirmationPopoverDefaults.confirmButtonType = 'primary';

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState/*, fromParams*/) {
      if (!('data' in toState) || !('access' in toState.data)) {
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
