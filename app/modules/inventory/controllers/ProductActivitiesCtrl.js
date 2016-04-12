'use strict';

(function () {
  angular.module('ph.inventory')
    .controller('ArticlesActionsCtrl', ['$scope', 'articleId', 'ArticlesActions', 'Alert',
      function ($scope, articleId, ArticlesActions, Alert) {
        ArticlesActions.get({articleId: articleId}, function (res) {
          $scope.actions = res.results;
        }, function (res) {
          Alert.error('Fehler beim Laden der Artikel-Aktivitäten: ' + res.data.message);
        });
      }
    ])
})();
