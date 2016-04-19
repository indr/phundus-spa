(function () {
  'use strict';

  // https://ngmodules.com/modules/ngtagsinput

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
      controller: ['_', '$scope', 'Articles', 'InventoryArticleTags', 'InventoryTags', 'Alert', controller],
      templateUrl: 'modules/inventory/views/directives/phInventoryArticleTagsInput.html'
    };

    function controller(_, scope, Articles, ArticleTags, Tags, Alert) {
      scope.tags = [];
      scope.tagAdded = tagAdded;
      scope.tagRemoved = tagRemoved;
      scope.loadTags = loadTags;

      activate();

      function activate() {
        Articles.get({tenantId: scope.tenantId, articleId: scope.articleId},
          function (res) {
            scope.tags = res.tags;
          });
      }

      function tagAdded(tag) {
        var rq = {tenantId: scope.tenantId, articleId: scope.articleId, name: tag.text};
        ArticleTags.post(rq, function () {
        }, function () {
          Alert.error('Fehler beim Hinzufügen des Tags.');
          _.remove(scope.tags, tag);
        });
      }

      function tagRemoved(tag) {
        var rq = {tenantId: scope.tenantId, articleId: scope.articleId, tag: tag.text};
        ArticleTags.delete(rq, function () {
        }, function () {
          Alert.error('Fehler beim Entfernen des Tags.');
          scope.tags.push(tag);
        })
      }

      function loadTags(query) {
        return Tags.query({q: query}).$promise
          .then(function (res) {
            return _.map(res.results, function (each) {
              return each.name;
            });
          });
      }
    }
  }
})();
