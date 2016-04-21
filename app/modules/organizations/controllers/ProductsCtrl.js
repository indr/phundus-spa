(function () {
  'use strict';

  angular.module('ph.organizations')
    .controller('OrganizationsProductsCtrl', OrganizationsProductCtrl);


  function OrganizationsProductCtrl(_, $scope, $window, Articles, Auth, Alert, organizationId, $state, inventoryCreateArticleModal) {
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
      inventoryCreateArticleModal.open(organizationId,
        function (article) {
          $state.go('organization.product.details', {
            organizationId: organizationId,
            articleShortId: article.articleShortId,
            articleId: article.articleId
          });
        });
    };
  }
})();
