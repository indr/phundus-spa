'use strict';

(function () {
  angular.module('ph.ui')
    .directive('phEditArticleLink', [
      function () {
        return {
          restrict: 'E',
          scope: {
            articleId: '=',
            articleShortId: '=',
            ownerId: '=',
            ownerType: '='
          },
          template: '<a data-ng-show="ownerType == \'organization\'" href="" data-ui-sref="organizations.articles.edit.details({organizationId: ownerId, articleId: articleId, articleShortId: articleShortId})">org</a>' +
          '<a data-ng-show="ownerType == \'user\'" href="" data-ui-sref="user.articles.article({userId: ownerId, articleId: articleId, articleShortId: articleShortId})">user</a>'
        }
      }
    ]);
})();
