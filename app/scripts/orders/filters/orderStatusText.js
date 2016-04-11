'use strict';

(function () {
  angular.module('phundusApp')
    .filter('orderStatusText', function () {
      return function (input) {
        var status = {
          "Pending": "Provisorisch", "Approved": "Bestätigt", "Rejected": "Abgelehnt", "Closed": "Abgeschlossen"
        };
        return status[input] || input;
      };
    });
})();
