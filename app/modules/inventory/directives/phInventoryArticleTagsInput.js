'use strict';

// https://ngmodules.com/modules/ngtagsinput

(function () {
  angular.module('ph.inventory')
    .directive('phInventoryArticleTagsInput', phInventoryArticleTagsInput);

  function phInventoryArticleTagsInput() {
    return {
      restrict: 'E',
      replace: 'true',
      scope: {
        tenantId: '=',
        articleId: '=productId'
      },
      controller: ['_', '$scope', 'Articles', 'InventoryArticleTags', 'Alert', controller],
      templateUrl: 'modules/inventory/views/directives/phInventoryArticleTagsInput.html'
    };

    function controller(_, scope, Articles, Tags, Alert) {
      scope.tags = [];
      scope.tagAdded = tagAdded;
      scope.tagRemoved = tagRemoved;

      activate();

      function activate() {
        Articles.get({tenantId: scope.tenantId, articleId: scope.articleId},
          function (res) {
            scope.tags = res.tags;
          });
      }

      function tagAdded(tag) {
        var rq = {tenantId: scope.tenantId, articleId: scope.articleId, name: tag.text};
        Tags.post(rq, function () {
        }, function () {
          Alert.error('Fehler beim Hinzufügen des Tags.');
          _.remove(scope.tags, tag);
        });
      }

      function tagRemoved(tag) {
        var rq = {tenantId: scope.tenantId, articleId: scope.articleId, tag: tag.text};
        Tags.delete(rq, function () {
        }, function () {
          Alert.error('Fehler beim Entfernen des Tags.');
          scope.tags.push(tag);
        })
      }
    }
  }
})();
