'use strict';

(function () {

  angular.module('phundusApp')
    .controller('UsersArticlesDescriptionCtrl', ['$scope', '$state', 'userId', 'articleId', 'Articles', 'Alert',
      function ($scope, $state, userId, articleId, Articles, Alert) {
        $scope.userId = userId;
        $scope.articleId = articleId;
        $scope.data = {};

        Articles.get({ownerId: userId, articleId: articleId}, function (res) {
          $scope.data.description = res.description;
        }, function () {
          Alert.error('Fehler beim Laden der Beschreibung.');
        });

        $scope.submit = function () {
          $scope.form.$submitting = true;
          Articles.patch({ownerId: userId, articleId: articleId, description: $scope.data.description}, function () {
            $scope.form.$submitting = false;
            Alert.success('Die Beschreibung wurde erfolgreich gespeichert.');
          }, function () {
            $scope.form.$submitting = false;
            Alert.error('Fehler beim Speichern der Beschreibung.');
          });
        };

        $scope.cancel = function () {
          $state.go('user.articles.articles', {userId: userId})
        };
      }
    ]);

})();
