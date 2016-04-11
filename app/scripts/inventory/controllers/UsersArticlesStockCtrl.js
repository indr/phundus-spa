'use strict';

(function () {

  angular.module('phundusApp')
    .controller('UsersArticlesStockCtrl', ['$scope', 'userId', 'articleId', 'ArticlesStock', 'Alert',
      function ($scope, userId, articleId, ArticlesStock, Alert) {
        $scope.userId = userId;
        $scope.articleId = articleId;
        $scope.stock = null;

        ArticlesStock.get({ownerId: userId, articleId: articleId}, function (res) {
          $scope.stock = res;
        }, function () {
          Alert.error('Fehler beim Laden des Bestandes.');
        });
      }
    ]);
})();
