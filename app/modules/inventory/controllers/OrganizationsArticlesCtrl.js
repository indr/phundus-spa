'use strict';

(function () {

  angular.module('phundusApp')
    .controller('OrganizationsArticlesCtrl', ['_', '$scope', '$window', 'Articles', 'Auth', 'Alert', 'organizationId', '$uibModal', '$state',
      function (_, $scope, $window, Articles, Auth, Alert, organizationId, $uibModal, $state) {

        $scope.loading = true;
        $scope.userRoles = Auth.userRoles;
        $scope.organizationId = organizationId;

        Articles.query({ownerId: organizationId}, function (res) {
          $scope.articles = res.results;
          $scope.displayedArticles = [].concat($scope.articles);
          $scope.loading = false;
        }, function () {
          Alert.error("Fehler beim Laden der Artikel.");
          $scope.loading = false;
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
                return organizationId;
              }
            }
          });

          modalInstance.result.then(function (article) {
            Articles.post(article, function (res) {
              $state.go('organizations.articles.edit.details', {
                organizationId: organizationId,
                articleShortId: res.articleShortId,
                articleId: res.articleId
              });
            }, function () {
              Alert.error('Fehler beim Erstellen des Materials.');
            });
          });
        };
      }
    ]);
})();
