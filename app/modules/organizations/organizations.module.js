(function () {
  'use strict';

  var module = angular.module('ph.organizations', [
    'ph.inventory',
    'ph.orders',
    'ph.stores',
    'ph.upload']);

  module.config(states);


  function states($stateProvider, authProvider) {
    var access = authProvider.accessLevels;

    $stateProvider
      .state('organizations', {
        data: {
          access: access.public
        },
        url: '/organizations/',
        templateUrl: templateUrl('organizations.html'),
        controller: 'OrganizationsCtrl'
      })
      .state('organization', {
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
          }],
          tenantId: ['$stateParams', function ($stateParams) {
            return $stateParams.organizationId;
          }]
        }
      })
      .state('organization.home', {
        data: {
          access: access.public
        },
        url: '',
        templateUrl: templateUrl('home.html'),
        controller: 'OrganizationCtrl',
        resolve: {
          organizationId: ['$stateParams', function ($stateParams) {
            return $stateParams.organizationId;
          }]
        }
      })
      .state('organization.applications', {
        url: '/applications/',
        templateUrl: templateUrl('applications.html'),
        controller: 'OrganizationApplicationsCtrl'
      })
      .state('organization.contact-details', {
        url: '/contact',
        templateUrl: templateUrl('edit-contact-details.html'),
        controller: 'OrganizationsEditContactDetailsCtrl'
      })
      .state('organization.files', {
        url: '/files/',
        templateUrl: templateUrl('files.html'),
        controller: ['$scope', 'organizationId',
          function ($scope, organizationId) {
            $scope.url = '/api/v0/organizations/' + organizationId + '/files';
          }
        ]
      })
      .state('organization.members', {
        url: '/members/',
        templateUrl: templateUrl('members.html'),
        controller: 'OrganizationMembersCtrl'
      })
      .state('organization.orders', {
        url: '/orders/',
        templateUrl: templateUrl('orders.html'),
        controller: 'OrganizationOrdersCtrl',
        controllerAs: 'vm'
      })
      .state('organization.order', {
        url: '/orders/{orderId}',
        templateUrl: templateUrl('order.html'),
        controller: 'OrganizationOrderCtrl',
        resolve: {
          orderId: ['$stateParams', function ($stateParams) {
            return $stateParams.orderId;
          }]
        }
      })
      .state('organization.products', {
        url: '/products/',
        templateUrl: templateUrl('products.html'),
        controller: 'OrganizationsProductsCtrl'
      })
      .state('organization.product', {
        abstract: true,
        url: '/products/:articleId/:articleShortId',
        template: '<ph-organization-article-navbar data-organization-id="organizationId" data-article-id="articleId" data-article-short-id="articleShortId"></ph-organization-article-navbar><ui-view/>',
        controller: ['$scope', 'organizationId', 'articleId', 'articleShortId',
          function ($scope, organizationId, articleId, articleShortId) {
            $scope.tenantId = organizationId;
            $scope.articleId = articleId;
            $scope.articleShortId = articleShortId;
          }],
        resolve: {
          articleId: ['$stateParams', function ($stateParams) {
            return $stateParams.articleId || $stateParams.productId;
          }],
          articleShortId: ['$stateParams', function ($stateParams) {
            return $stateParams.articleShortId;
          }]
        }
      })
      .state('organization.product.actions', {
        url: '/actions',
        template: '<view-title>Aktivitäten</view-title><div ph-inventory-article-activities tenant-id="tenantId" article-id="articleId"></div>'
      })
      .state('organization.product.details', {
        url: '/',
        template: '<view-title>Material bearbeiten</view-title><div ph-inventory-article-details tenant-id="tenantId" article-id="articleId" has-member-price="true"></div>'
      })
      .state('organization.product.description', {
        url: '/description',
        template: '<view-title>Beschreibung bearbeiten</view-title><div ph-inventory-article-description tenant-id="tenantId" article-id="articleId"></div>'
      })
      .state('organization.product.specification', {
        url: '/specification',
        template: '<view-title>Spezifikation bearbeiten</view-title><div ph-inventory-article-specification tenant-id="tenantId" article-id="articleId"></div>'
      })
      .state('organization.product.stock', {
        url: '/stock',
        template: '<view-title>Bestand</view-title><div ph-inventory-article-stock tenant-id="tenantId" article-id="articleId"></div>'
      })
      .state('organization.product.files', {
        url: '/files',
        template: '<view-title>Dateien</view-title><div ph-inventory-article-files tenant-id="tenantId" article-id="articleId"></div>'
      })
      .state('organization.settings', {
        url: '/settings',
        templateUrl: templateUrl('settings.html'),
        controller: 'OrganizationsSettingsCtrl'
      })
      .state('organization.startpage', {
        url: '/startpage',
        templateUrl: templateUrl('edit-startpage.html'),
        controller: 'OrganizationsEditStartpageCtrl'
      })
      .state('organization.store', {
        url: '/store',
        template: '<ph-store store="store" data-is-editable="true" loaded="true"></ph-store>',
        controller: 'OrganizationsStoreCtrl'
      });

    function templateUrl(fileName) {
      return 'modules/organizations/views/' + fileName;
    }
  }
})();
