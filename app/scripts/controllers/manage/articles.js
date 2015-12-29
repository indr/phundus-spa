'use strict';

/**
 * @ngdoc function
 * @name phundusApp.controller:ManageArticlesCtrl
 * @description
 * # ManageArticlesCtrl
 * Controller of the phundusApp
 */
angular.module('phundusApp')
  .controller('ManageArticlesCtrl', ['_', '$scope', '$window', 'UserArticles', 'Auth', 'Alert', 'organizationId',
    function (_, $scope, $window, Articles, Auth, Alert, organizationId) {

      $scope.loading = true;
      $scope.userRoles = Auth.userRoles;
      $scope.organizationId = organizationId;

      Articles.getAll(organizationId, function (res) {
        $scope.articles = res;
        $scope.displayedArticles = [].concat($scope.articles);
        $scope.loading = false;
      }, function () {
        Alert.error("Fehler beim Laden der Artikel.");
        $scope.loading = false;
      });

      $scope.delete = function(articleId, name) {
        if (!$window.confirm('Möchtest du den Artikel "' + name + '" wirklich löschen?')) {
          return;
        }
        Articles.delete(organizationId, articleId, function () {
          Alert.success('Der Artikel "' + name + '" wurder erfolgreich gelöscht.');
          _.remove($scope.displayedArticles, {id: articleId});
          _.remove($scope.articles, {id: articleId});
        }, function() {
          Alert.error('Fehler beim Löschen des Artikels "' + name +'".');
        });
      }
    }
  ]);
