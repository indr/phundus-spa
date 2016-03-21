'use strict';

angular.module('phundusApp')
  .factory('Alert', ['_', '$timeout', 'uuid4', '$uibModal',
    function (_, $timeout, uuid4, $uibModal) {
      //var alerts = {};
      var modal = null;

      //var dismissAlert = function (type, id) {
      //  //delete alerts[type][id];
      //};

      var showAlert = function (type, msg, title) {
        //var id = uuid4.generate();
        //alerts[type] = alerts[type] || {};
        //alerts[type][id] = msg;
        //$timeout(dismissAlert, 4500, true, type, id);

        if (modal === null) {
          modal = $uibModal.open({
            templateUrl: 'views/modals/alert.html',
            controller: 'AlertModalInstCtrl',
            resolve: {
              alert: function () {
                return {
                  type: type,
                  msg: msg,
                  title: title
                };
              }
            }
          });
          modal.result.then(function () {
            modal = null;
          }, function () {
            modal = null;
          });
        }
      };

      return {
        //alerts: alerts,
        //
        //dismiss: function (type, id) {
        //  dismissAlert(type, id);
        //},
        danger: _.partial(showAlert, 'danger'),
        error: _.partial(showAlert, 'danger'),
        info: _.partial(showAlert, 'info'),
        success: _.partial(showAlert, 'success'),
        warning: _.partial(showAlert, 'warning')
      };
    }])


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
