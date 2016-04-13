'use strict';

(function () {
  angular.module('ph.alerts')
    .controller('AlertModalInstCtrl', ['$scope', 'alert',
      function ($scope, alert) {
        var titles = {
          'danger': 'Fehler',
          'info': 'Hinweis',
          'success': 'Erfolg',
          'warning': 'Warnung'
        };
        $scope.alert = alert;
        $scope.title = alert.title || titles[alert.type] || 'Mitteilung';
      }
    ]);
})();
