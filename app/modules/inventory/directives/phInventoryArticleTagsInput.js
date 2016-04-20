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
        articleId: '=',
        tags: '='
      },
      controller: ['_', '$scope', 'InventoryArticleTags', 'InventoryTags', 'Alert', controller],
      templateUrl: 'modules/inventory/views/directives/phInventoryArticleTagsInput.html'
    };

    function controller(_, scope, ArticleTags, Tags, Alert) {
      scope.tagAdded = tagAdded;
      scope.tagRemoved = tagRemoved;
      scope.loadTags = loadTags;

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
