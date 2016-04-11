'use strict';

(function () {
  angular.module('phundusApp')
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

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
        .state('public.404', {
          url: '/404',
          templateUrl: 'views/404.html'
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
})();
