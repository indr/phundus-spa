'use strict';

(function () {
  angular.module('ph.inventory')
    .factory('Articles', ['$resource', function ($resource) {
      return $resource('/api/v0/articles/:articleId', {articleId: '@articleId'});
    }])
    .factory('ArticlesActions', ['$resource', function ($resource) {
      return $resource('/api/v0/articles/:articleId/actions', {articleId: '@articleId'});
    }])
    .factory('ArticlesStock', ['$resource', function ($resource) {
      return $resource('/api/v0/articles/:articleId/stock', {articleId: '@articleId'});
    }])
    .factory('InventoryArticleTags', ['$resource', function ($resource) {
      return $resource('/api/v0/inventory/:tenantId/articles/:articleId/tags/:tag', {
        tenantId: '@tenantId', articleId: '@articleId', tag: '@tag'
      })
    }])
    .factory('InventoryTags', ['$resource', function ($resource) {
      return $resource('/api/v0/inventory/tags');
    }])
})();
