'use strict';

angular.module('phundusApp')
  .factory('Alert', ['$timeout', 'uuid4', function ($timeout, uuid4) {
    var alerts = {};

    var dismissAlert = function (type, id) {
      delete alerts[type][id];
    };

    var showAlert = function (type, msg) {
      var id = uuid4.generate();
      alerts[type] = alerts[type] || {};
      alerts[type][id] = msg;
      $timeout(dismissAlert, 4000, true, type, id);
    };

    return {
      alerts: alerts,

      dismiss: function (type, id) {
        dismissAlert(type, id);
      },
      danger: function (msg) {
        showAlert('danger', msg);
      },
      error: function (msg) {
        showAlert('danger', msg);
      },
      info: function (msg) {
        showAlert('info', msg);
      },
      success: function (msg) {
        showAlert('success', msg);
      },
      warning: function (msg) {
        showAlert('warning', msg);
      }
    };
  }]);
