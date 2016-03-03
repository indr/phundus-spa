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
    'angularMoment',
    'blueimp.fileupload',
    'chartjs-directive',
    'leaflet-directive',
    'ngCookies',
    'ngHolder',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'smart-table',
    'ui.bootstrap',
    'ui.gravatar',
    'ui.router',
    'ui.tinymce',
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
      .state('public.feedback', {
        url: '/feedback',
        templateUrl: 'views/public/feedback.html',
        controller: 'MetaFeedbackCtrl'
      })
      //.state('public.index', {
      //  url: '/',
      //  template: '<ui-view />',
      //  controller: 'ShopCtrl'
      //})
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
      })
      .state('public.validate-account', {
        url: '/validate/account?key',
        templateUrl: 'views/public/validate-account.html',
        controller: 'MetaValidateCtrl',
        resolve: {
          key: ['$stateParams', function ($stateParams) {
            console.log($stateParams);
            return $stateParams.key;
          }]
        }
      })
      .state('public.validate-e-mail-address', {
        url: '/validate/email-address?key',
        templateUrl: 'views/public/validate-email-address.html',
        controller: 'MetaValidateCtrl',
        resolve: {
          key: ['$stateParams', function ($stateParams) {
            return $stateParams.key;
          }]
        }
      })
    ;

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
      })
      .state('anon.reset-password', {
        url: '/forgot',
        templateUrl: 'views/account/reset-password.html',
        controller: 'ResetPasswordCtrl'
      })
    ;

    // User routes
    $stateProvider

      .state('cart', {
        url: '/cart',
        data: {
          access: access.user
        },
        templateUrl: 'views/shop/cart.html',
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
        templateUrl: 'views/shop/checkout.html',
        controller: 'ShopCheckoutCtrl',
        resolve: {
          userId: ['Auth', function (Auth) {
            return Auth.user.userId;
          }]
        }
      })
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
        templateUrl: 'views/users/home.html',
        controller: 'UsersHomeCtrl'
      })
      .state('user.account', {
        url: '/account',
        templateUrl: 'views/users/account.html',
        controller: 'UsersAccountCtrl'
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
        templateUrl: 'views/inventory/article-actions.html',
        controller: 'ArticlesActionsCtrl'
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
        template: '<ph-organization-navbar data-organization-id="organizationId"></ph-organization-navbar><ui-view/>',
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
        template: '<ui-view/>'
      })
      .state('organizations.stores.index', {
        url: '/',
        template: '<ph-store store="store" data-is-editable="true" loaded="true"></ph-store>',
        controller: 'OrganizationsStoreCtrl'
      })
      .state('organizations.articles', {
        abstract: true,
        url: '/articles',
        template: '<ui-view/>'
      })
      .state('organizations.articles.index', {
        url: '/',
        templateUrl: 'views/organizations/articles.html',
        controller: 'OrganizationsArticlesCtrl'
      })
      .state('organizations.articles.edit', {
        abstract: true,
        url: '/:articleId/:articleShortId',
        template: '<ph-organization-article-navbar data-organization-id="organizationId" data-article-id="articleId" data-article-short-id="articleShortId"></ph-organization-article-navbar><ui-view/>',
        controller: ['$scope', 'organizationId', 'articleId', 'articleShortId',
          function ($scope, organizationId, articleId, articleShortId) {
            $scope.organizationId = organizationId;
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
      .state('organizations.articles.edit.actions', {
        url: '/actions',
        templateUrl: 'views/inventory/article-actions.html',
        controller: 'ArticlesActionsCtrl'
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
      })
      .state('organizations.settings', {
        url: '/settings',
        templateUrl: 'views/organizations/settings.html',
        controller: 'OrganizationsSettingsCtrl'
      })
      .state('organizations.contact-details', {
        url: '/contact',
        templateUrl: 'views/organizations/edit-contact-details.html',
        controller: 'OrganizationsEditContactDetailsCtrl'
      })
      .state('organizations.startpage', {
        url: '/startpage',
        templateUrl: 'views/organizations/edit-startpage.html',
        controller: 'OrganizationsEditStartpageCtrl'
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
      .state('admin.projections', {
        url: '/projections',
        templateUrl: 'views/admin/projections.html',
        controller: 'AdminProjectionsCtrl'
      })
      .state('admin.schemaUpdate', {
        url: '/schema-update',
        template: '<pre>{{schemaUpdate}}</pre>',
        controller: 'AdminSchemaUpdateCtrl'
      })
      .state('admin.status', {
        url: '/status',
        template: '<div class="page-header"><h1>Status</h1></div><pre>{{data | json}}</pre>',
        controller: 'AdminStatusCtrl'
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
      var status = {
        "Pending": "Provisorisch", "Approved": "Bestätigt", "Rejected": "Abgelehnt", "Closed": "Abgeschlossen"
      };

      return status[input] || input;
    };
  });

angular.module('phundusApp')
  .controller('MyFileUploadCtrl', ['_', '$scope', '$http', 'Alert', '$filter', '$window', '$timeout',
    function (_, $scope, $http, Alert) {
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
      $scope.toggleIsPreview = function (file) {
        $scope.isPreviewSubmitting = file.isPreviewSubmitting = true;
        $http.patch(url + '/' + file.name, {isPreview: file.isPreview})
          .then(function () {

            $scope.isPreviewSubmitting = file.isPreviewSubmitting = false;
            _.forEach($scope.queue, function (each) {
              each.isPreview = file === each;
            });
          }, function () {
            $scope.isPreviewSubmitting = file.isPreviewSubmitting = false;
            file.isPreview = false;
            Alert.error('Fehler beim Setzen als Vorschaubild.');
          }
        );
      };
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

app.run(['$rootScope', '$state', '$location', 'Auth', 'Alert', 'confirmationPopoverDefaults', 'amMoment',
  function ($rootScope, $state, $location, Auth, Alert, confirmationPopoverDefaults, amMoment) {
    $rootScope.isTestEnv = /(^localhost)|(^acceptance)/.test($location.host());
    $rootScope.isLocalEnv = /(^localhost)/.test($location.host());
    $rootScope.$state = $state;
    confirmationPopoverDefaults.confirmButtonType = 'primary';
    confirmationPopoverDefaults.confirmText = 'Ja';
    confirmationPopoverDefaults.cancelText = 'Nein';

    amMoment.changeLocale('de');

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
