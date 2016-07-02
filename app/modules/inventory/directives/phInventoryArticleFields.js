(function () {
  'use strict';

  angular.module('ph.inventory')
    .directive('phInventoryArticleFields', phInventoryArticleFields);


  function phInventoryArticleFields() {
    return {
      restrict: 'EA',
      replace: 'true',
      scope: {
        tenantId: '=',
        articleId: '=',
        article: '='
      },
      controller: InventoryArticleFieldsCtrl,
      templateUrl: 'modules/inventory/views/directives/phInventoryArticleFields.html'
    }
  }

  /*@ngInject*/
  function InventoryArticleFieldsCtrl(_, $scope, Articles, Alert) {
    $scope.submit = submit;
    $scope.reset = reset;

    $scope.$watch('article', function (newValue) {
      if (!newValue) {
        return;
      }

      $scope.formReset = _.pick(newValue, ['name', 'brand', 'grossStock', 'color']);
      $scope.formModel = angular.copy($scope.formReset);
    });

    function submit() {
      $scope.form.$submitting = true;
      var model = $scope.formModel;
      Articles.patch({
          ownerId: $scope.tenantId, articleId: $scope.articleId, name: model.name, brand: model.brand,
          grossStock: model.grossStock, color: model.color
        },
        function () {
          $scope.form.$submitting = false;
          Alert.success('Das Material wurde erfolgreich gespeichert.');
        },
        function () {
          $scope.form.$submitting = false;
          Alert.error('Fehler beim Speichern des Material.');
        });
    }

    function reset() {
      angular.copy($scope.formReset, $scope.formModel);
      $scope.form.$setPristine();
    }
  }
})();
