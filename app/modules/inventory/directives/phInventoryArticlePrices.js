(function () {
  'use strict';

  angular.module('ph.inventory')
    .directive('phInventoryArticlePrices', phInventoryArticlePrices);

  phInventoryArticlePrices.$inject = [];
  function phInventoryArticlePrices() {
    return {
      restrict: 'EA',
      replace: 'true',
      scope: {
        tenantId: '=',
        articleId: '=',
        hasMemberPrice: '=',
        article: '='
      },
      controller: InventoryArticlePricesCtrl,
      templateUrl: 'modules/inventory/views/directives/phInventoryArticlePrices.html'
    }
  }

  InventoryArticlePricesCtrl.$inject = ['_', '$scope', 'Articles', 'Alert'];
  function InventoryArticlePricesCtrl(_, $scope, Articles, Alert) {
    $scope.submitPrices = submitPrices;
    $scope.resetPrices = resetPrices;

    $scope.$watch('article', function (newValue) {
      if (!newValue) {
        return;
      }

      $scope.pricesFormReset = _.pick(newValue, ['publicPrice', 'memberPrice']);
      $scope.pricesFormModel = angular.copy($scope.pricesFormReset);
    });

    function submitPrices(form, model) {
      form.$submitting = true;
      Articles.patch({articleId: $scope.articleId, prices: model}, function () {
        $scope.pricesFormReset = angular.copy($scope.pricesFormModel);
        form.$setPristine();
        form.$submitting = false;
        Alert.success('Die Einstellungen wurden erfolgreich gespeichert.');
      }, function (res) {
        form.$submitting = false;
        Alert.error('Fehler beim Speichern der Einstellungen: ' + (angular.isDefined(res.message) ? res.message : 'Unbekannter Fehler.'));
      });
    }

    function resetPrices(form, formModel, resetModel) {
      angular.copy(resetModel, formModel);
      form.$setPristine();
    }
  }
})();
