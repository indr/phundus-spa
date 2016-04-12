'use strict';

(function () {
  angular.module('ph.inventory')
    .controller('ProductStockCtrl', ProductStockCtrl);

  ProductStockCtrl.$inject = ['$scope', 'tenantId', 'productId', 'ArticlesStock'];

  function ProductStockCtrl($scope, tenantId, productId, ArticlesStock) {
    $scope.tenantId = tenantId;
    $scope.productId = productId;

    ArticlesStock.get({ownerId: tenantId, articleId: productId}, function (res) {
      $scope.stock = res;
    });
  }

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
