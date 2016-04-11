'use strict';

(function () {

  angular.module('phundusApp')
    .controller('UsersArticlesIndexCtrl', ['_', '$scope', 'userId', '$window', 'Stores', 'Articles', 'Alert', '$uibModal', '$state', 'Auth',
      function (_, $scope, userId, $window, Stores, Articles, Alert, $uibModal, $state, Auth) {

        $scope.loading = true;
        $scope.store = null;
        $scope.articles = null;

        Stores.query({ownerId: Auth.user.userId}, function (res) {

          if (res.results.length === 0) {
            $scope.loading = false;
            return;
          }
          $scope.store = res.results[0];

          Articles.query({ownerId: userId}, function (res) {
            $scope.articles = res.results;
            $scope.displayedArticles = [].concat($scope.articles);
            $scope.loading = false;
          }, function () {
            Alert.error("Fehler beim Laden der Artikel.");
            $scope.loading = false;
          });

        });

        $scope.delete = function (articleId, name) {
          if (!$window.confirm('Möchtest du den Artikel "' + name + '" wirklich löschen?')) {
            return;
          }
          Articles.delete({articleId: articleId}, function () {
            Alert.success('Der Artikel "' + name + '" wurder erfolgreich gelöscht.');
            _.remove($scope.displayedArticles, {id: articleId});
            _.remove($scope.articles, {id: articleId});
          }, function () {
            Alert.error('Fehler beim Löschen des Artikels "' + name + '".');
          });
        };

        $scope.createArticle = function () {

          var modalInstance = $uibModal.open({
            templateUrl: 'views/modals/create-article.html',
            controller: 'CreateArticleModalInstCtrl',
            resolve: {
              ownerId: function () {
                return userId;
              }
            }
          });

          modalInstance.result.then(function (article) {
            Articles.post(article, function (res) {
              $state.go('user.articles.article.details', {
                userId: userId,
                articleId: res.articleId,
                articleShortId: res.articleShortId
              });
            }, function () {
              Alert.error('Fehler beim Erstellen des Materials.');
            });
          });
        };
      }
    ]);
})();
