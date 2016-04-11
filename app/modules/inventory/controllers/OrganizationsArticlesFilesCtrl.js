'use strict';

(function () {
  angular.module('phundusApp')
    .controller('OrganizationsArticlesFilesCtrl', ['$scope', 'organizationId', 'articleId',
      function ($scope, organizationId, articleId) {
        $scope.url = '/api/v0/articles/' + articleId + '/files';
        $scope.hasPreview = true;
      }
    ]);
})();
