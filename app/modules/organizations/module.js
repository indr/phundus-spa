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


      .state('organizations.products', {
        url: '/products/',
        templateUrl: templateUrl('products.html'),
        controller: 'OrganizationsProductsCtrl'
      })
      .state('organizations.product', {
        abstract: true,
        url: '/products/:articleId/:articleShortId',
        template: '<ph-organization-article-navbar data-organization-id="organizationId" data-article-id="articleId" data-article-short-id="articleShortId"></ph-organization-article-navbar><ui-view/>',
        controller: ['$scope', 'organizationId', 'articleId', 'articleShortId',
          function ($scope, organizationId, articleId, articleShortId) {
            $scope.organizationId = organizationId;
            $scope.articleId = articleId;
            $scope.articleShortId = articleShortId;
            $scope.productId = articleId;
            $scope.tenantId = organizationId;
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
      .state('organizations.product.actions', {
        url: '/actions',
        template: '<view-title>Aktivitäten</view-title><div ph-inventory-product-activities tenant-id="tenantId" product-id="productId"></div>'
      })
      .state('organizations.product.details', {
        url: '/',
        template: '<view-title>Material bearbeiten</view-title><div ph-inventory-product-details tenant-id="tenantId" product-id="productId" has-member-price="true"></div>'
      })
      .state('organizations.product.description', {
        url: '/description',
        template: '<view-title>Beschreibung bearbeiten</view-title><div ph-inventory-product-description tenant-id="tenantId" product-id="productId"></div>'
      })
      .state('organizations.product.specification', {
        url: '/specification',
        template: '<view-title>Spezifikation bearbeiten</view-title><div ph-inventory-product-specification tenant-id="tenantId" product-id="productId"></div>'
      })
      .state('organizations.product.stock', {
        url: '/stock',
        template: '<view-title>Bestand</view-title><div ph-inventory-product-stock tenant-id="tenantId" product-id="productId"></div>'
      })
      .state('organizations.product.files', {
        url: '/files',
        template: '<view-title>Dateien</view-title><div ph-inventory-product-files tenant-id="tenantId" product-id="productId"></div>'
      })

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
  }
})();
