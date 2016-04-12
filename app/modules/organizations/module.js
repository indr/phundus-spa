'use strict';

(function () {
  angular.module('ph.organizations', ['ph.inventory']);

  angular.module('phundusApp')
    .config(states);

  states.$inject = ['$stateProvider', 'authProvider'];

  function states($stateProvider, authProvider) {

    var access = authProvider.accessLevels;

    // Public
    $stateProvider
      .state('public.organizations', {
        url: '/organizations',
        templateUrl: templateUrl('organizations.html'),
        controller: 'OrganizationsCtrl'
      })
      .state('public.organization', {
        url: '/organizations/:organizationId',
        templateUrl: templateUrl('home.html'),
        controller: 'OrganizationCtrl',
        resolve: {
          organizationId: ['$stateParams', function ($stateParams) {
            return $stateParams.organizationId;
          }]
        }
      });

    // Manage
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
        templateUrl: templateUrl('applications.html'),
        controller: 'ManageOrganizationApplicationsCtrl'
      })
      .state('manage.organization.files', {
        url: '/files/',
        templateUrl: templateUrl('files.html'),
        controller: ['$scope', 'organizationId',
          function ($scope, organizationId) {
            $scope.url = '/api/v0/organizations/' + organizationId + '/files';
          }
        ]
      })
      .state('manage.organization.members', {
        url: '/members/',
        templateUrl: templateUrl('members.html'),
        controller: 'ManageOrganizationMembersCtrl'
      })
      .state('manage.organization.orders', {
        url: '/orders/',
        templateUrl: templateUrl('orders.html'),
        controller: 'ManageOrganizationOrdersCtrl'
      })
      .state('manage.organization.order', {
        url: '/orders/{orderId}',
        templateUrl: templateUrl('order.html'),
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
        templateUrl: 'modules/organizations/views/manage/organization-settings.html'
      });

    // Organizations
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
          }],
          tenantId: ['$stateParams', function ($stateParams) {
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

      /*** article / products ***/
      .state('organizations.articles', {
        abstract: true,
        url: '/articles',
        template: '<ui-view/>'
      })
      .state('organizations.articles.index', {
        url: '/',
        templateUrl: templateUrl('articles.html'),
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
      .state('organizations.articles.edit.actions', {
        url: '/actions',
        templateUrl: inventoryTemplateUrl('article-actions.html'),
        controller: 'ArticlesActionsCtrl'
      })
      .state('organizations.articles.edit.details', {
        url: '/',
        templateUrl: inventoryTemplateUrl('edit-article-details.html'),
        controller: 'OrganizationsArticlesDetailsCtrl'
      })
      .state('organizations.articles.edit.description', {
        url: '/description',
        templateUrl: inventoryTemplateUrl('edit-article-description.html'),
        controller: 'OrganizationsArticlesDescriptionCtrl'
      })
      .state('organizations.articles.edit.specification', {
        url: '/specification',
        templateUrl: inventoryTemplateUrl('edit-article-specification.html'),
        controller: 'OrganizationsArticlesSpecificationCtrl'
      })
      .state('organizations.articles.edit.stock', {
        url: '/stock',
        templateUrl: inventoryTemplateUrl('edit-article-stock.html'),
        //controller: 'OrganizationsArticlesStockCtrl'
        controller: 'ProductStockCtrl'
      })
      .state('organizations.articles.edit.files', {
        url: '/files',
        templateUrl: inventoryTemplateUrl('edit-article-files.html'),
        controller: 'OrganizationsArticlesFilesCtrl'
      })
      /*** ***/

      .state('organizations.settings', {
        url: '/settings',
        templateUrl: templateUrl('settings.html'),
        controller: 'OrganizationsSettingsCtrl'
      })
      .state('organizations.contact-details', {
        url: '/contact',
        templateUrl: templateUrl('edit-contact-details.html'),
        controller: 'OrganizationsEditContactDetailsCtrl'
      })
      .state('organizations.startpage', {
        url: '/startpage',
        templateUrl: templateUrl('edit-startpage.html'),
        controller: 'OrganizationsEditStartpageCtrl'
      });

    function templateUrl(fileName) {
      return 'modules/organizations/views/' + fileName;
    }

    function inventoryTemplateUrl(fileName) {
      return 'modules/inventory/views/' + fileName;
    }
  }
})();
