(function () {
  'use strict';

  angular.module('ph.inventory')
    .directive('phInventoryArticleFiles', phInventoryArticleFiles);


  function phInventoryArticleFiles() {
    return {
      restrict: 'EA',
      replace: 'true',
      scope: {
        tenantId: '=',
        articleId: '='
      },
      controller: InventoryArticleFilesCtrl,
      templateUrl: 'modules/inventory/views/directives/phInventoryArticleFiles.html'
    }
  }

  /*@ngInject*/
  function InventoryArticleFilesCtrl($scope) {
    $scope.url = '/api/v0/articles/' + $scope.articleId + '/files';
    $scope.hasPreview = true;
  }
})();
