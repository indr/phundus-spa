'use strict';

(function () {

  angular.module('phundusApp')
    .controller('UsersArticlesSpecificationCtrl', ['$scope', '$state', 'userId', 'articleId', 'Articles', 'Alert',
      function ($scope, $state, userId, articleId, Articles, Alert) {
        $scope.userId = userId;
        $scope.articleId = articleId;
        $scope.data = {};

        Articles.get({ownerId: userId, articleId: articleId}, function (res) {
          $scope.data.specification = res.specification;
        }, function () {
          Alert.error('Fehler beim Laden der Spezifikation.');
        });

        $scope.submit = function () {
          $scope.form.$submitting = true;
          Articles.patch({
            ownerId: userId,
            articleId: articleId,
            specification: $scope.data.specification
          }, function () {
            $scope.form.$submitting = false;
            Alert.success('Die Spezifikation wurde erfolgreich gespeichert.');
          }, function () {
            $scope.form.$submitting = false;
            Alert.error('Fehler beim Speichern der Spezifikation.');
          });
        };

        $scope.cancel = function () {
          $state.go('user.articles.articles', {userId: userId})
        };
      }
    ]);
})();
