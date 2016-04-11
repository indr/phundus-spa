'use strict';

(function () {

  angular.module('phundusApp')
    .controller('UsersArticlesDetailsCtrl', ['_', '$scope', '$state', 'userId', 'articleId', 'Articles', 'Alert',
      function (_, $scope, $state, userId, articleId, Articles, Alert) {
        $scope.userId = userId;
        $scope.articleId = articleId;
        $scope.article = null;

        Articles.get({ownerId: userId, articleId: articleId}, function (res) {
          $scope.article = res;

          $scope.pricesFormReset = _.pick(res, ['publicPrice', 'memberPrice']);
          $scope.pricesFormModel = angular.copy($scope.pricesFormReset);
        }, function () {
          Alert.error('Fehler beim Laden des Artikels.');
        });

        $scope.submit = function () {
          $scope.form.$submitting = true;
          Articles.patch({
            ownerId: userId, articleId: articleId, name: $scope.article.name, brand: $scope.article.brand,
            price: $scope.article.price, grossStock: $scope.article.grossStock, color: $scope.article.color
          }, function () {
            $scope.form.$submitting = false;
            Alert.success('Das Material wurde erfolgreich gespeichert.');
          }, function () {
            $scope.form.$submitting = false;
            Alert.error('Fehler beim Speichern des Material.');
          });
        };

        $scope.cancel = function () {
          $state.go('user.articles.articles', {userId: userId})
        };

        $scope.submitPrices = function (form, model) {
          form.$submitting = true;
          Articles.patch({articleId: articleId, prices: model}, function () {
            $scope.pricesFormReset = angular.copy($scope.pricesFormModel);
            form.$setPristine();
            form.$submitting = false;
            Alert.success('Die Einstellungen wurden erfolgreich gespeichert.');
          }, function (res) {
            form.$submitting = false;
            Alert.error('Fehler beim Speichern der Einstellungen: ' + (angular.isDefined(res.message) ? res.message : 'Unbekannter Fehler.'));
          });
        };
        $scope.resetPrices = function (form, formModel, resetModel) {
          angular.copy(resetModel, formModel);
          form.$setPristine();
        };
      }
    ]);
})();