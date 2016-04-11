'use strict';

(function () {
  angular.module('phundusApp')
    .controller('OrganizationsArticlesStockCtrl', ['$scope', 'organizationId', 'articleId', 'ArticlesStock', 'Alert',
      function ($scope, organizationId, articleId, ArticlesStock, Alert) {
        $scope.organizationId = organizationId;
        $scope.articleId = articleId;
        $scope.stock = null;

        ArticlesStock.get({ownerId: organizationId, articleId: articleId}, function (res) {
          $scope.stock = res;
        }, function () {
          Alert.error('Fehler beim Laden des Bestandes.');
        });
      }
    ]);
})();
