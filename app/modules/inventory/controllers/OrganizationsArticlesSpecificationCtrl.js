'use strict';

(function () {

  angular.module('phundusApp')
    .controller('OrganizationsArticlesSpecificationCtrl', ['$scope', '$state', 'organizationId', 'articleId', 'Articles', 'Alert',
      function ($scope, $state, organizationId, articleId, Articles, Alert) {
        $scope.organizationId = organizationId;
        $scope.articleId = articleId;
        $scope.data = {};

        Articles.get({ownerId: organizationId, articleId: articleId}, function (res) {
          $scope.data.specification = res.specification;
        }, function () {
          Alert.error('Fehler beim Laden der Spezifikation.');
        });

        $scope.submit = function () {
          $scope.form.$submitting = true;
          Articles.patch({
            ownerId: organizationId,
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
          $state.go('organizations.articles.index', {organizationId: organizationId})
        };
      }
    ]);
})();
