(function () {
  'use strict';

  angular.module('ph.alerts')
    .factory('AlertModal', AlertModal);

  AlertModal.$inject = ['$uibModal'];

  function AlertModal($uibModal) {
    return {
      open: openModal
    };

    function openModal(resolve) {
      var modal = $uibModal.open({
        templateUrl: 'modules/alerts/views/modals/alert.html',
        controller: AlertModalInstCtrl,
        resolve: resolve
      });
      return modal.result;
    }
  }


  AlertModalInstCtrl.$inject = ['$scope', 'alert'];

  function AlertModalInstCtrl($scope, alert) {
    var titles = {
      'danger': 'Fehler',
      'info': 'Hinweis',
      'success': 'Erfolg',
      'warning': 'Warnung'
    };
    $scope.alert = alert;
    $scope.title = alert.title || titles[alert.type] || 'Mitteilung';
  }
})();
