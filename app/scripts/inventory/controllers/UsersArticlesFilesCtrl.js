'use strict';

(function () {

  angular.module('phundusApp')
    .controller('UsersArticlesFilesCtrl', ['$scope', 'userId', 'articleId',
      function ($scope, userId, articleId) {
        $scope.url = '/api/v0/articles/' + articleId + '/files';
        $scope.hasPreview = true;
      }
    ]);

})();
