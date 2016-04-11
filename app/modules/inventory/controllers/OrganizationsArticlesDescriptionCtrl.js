'use strict';

(function () {

  angular.module('phundusApp')
    .controller('OrganizationsArticlesDescriptionCtrl', ['$scope', '$state', 'organizationId', 'articleId', 'Articles', 'Alert',
      function ($scope, $state, organizationId, articleId, Articles, Alert) {
        $scope.organizationId = organizationId;
        $scope.articleId = articleId;
        $scope.data = {};

        Articles.get({ownerId: organizationId, articleId: articleId}, function (res) {
          $scope.data.description = res.description;
        }, function () {
          Alert.error('Fehler beim Laden der Beschreibung.');
        });

        $scope.submit = function () {
          $scope.form.$submitting = true;
          Articles.patch({
            ownerId: organizationId,
            articleId: articleId,
            description: $scope.data.description
          }, function () {
            $scope.form.$submitting = false;
            Alert.success('Die Beschreibung wurde erfolgreich gespeichert.');
          }, function () {
            $scope.form.$submitting = false;
            Alert.error('Fehler beim Speichern der Beschreibung.');
          });
        };

        $scope.cancel = function () {
          $state.go('organizations.articles.index', {organizationId: organizationId})
        };
      }
    ]);

})();
