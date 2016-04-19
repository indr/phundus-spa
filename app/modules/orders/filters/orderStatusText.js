(function () {
  'use strict';

  angular.module('ph.orders')
    .filter('orderStatusText', orderStatusText);

  function orderStatusText() {
    return function (input) {
      var status = {
        "Pending": "Provisorisch", "Approved": "Bestätigt", "Rejected": "Abgelehnt", "Closed": "Abgeschlossen"
      };
      return status[input] || input;
    };
  }
})();
