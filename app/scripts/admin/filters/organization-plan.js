'use strict';

(function () {
  angular.module('phundusApp')
    .filter('organizationPlan', [
      function () {
        return function (input) {
          var plans = {
            "free": "Kostenlos",
            "membership": "Mitgliedschaft"
          };

          return plans[input] || input;
        };
      }
    ]);
})();
