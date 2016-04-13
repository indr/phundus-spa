'use strict';

(function () {
  angular.module('ph.alerts')
    .factory('Alert', Alert);

  Alert.$inject = ['_', 'AlertModal'];
  
  function Alert(_, AlertModal) {
    var modal = null;

    var showAlert = function (type, msg, title) {
      if (modal === null) {
        modal = AlertModal.open({
          alert: function () {
            return {
              type: type,
              msg: msg,
              title: title
            };
          }
        });
        modal.then(function () {
          modal = null;
        }, function () {
          modal = null;
        });
      }
    };

    return {
      danger: _.partial(showAlert, 'danger'),
      error: _.partial(showAlert, 'danger'),
      info: _.partial(showAlert, 'info'),
      success: _.partial(showAlert, 'success'),
      warning: _.partial(showAlert, 'warning')
    };
  }
})();
