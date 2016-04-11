'use strict';

(function () {
  angular.module('phundusApp')
    .factory('Articles', ['$resource', function ($resource) {
      return $resource('/api/v0/articles/:articleId', {articleId: '@articleId'});
    }])
    .factory('ArticlesActions', ['$resource', function ($resource) {
      return $resource('/api/v0/articles/:articleId/actions', {articleId: '@articleId'});
    }])
    .factory('ArticlesStock', ['$resource', function ($resource) {
      return $resource('/api/v0/articles/:articleId/stock', {articleId: '@articleId'});
    }])
})();
