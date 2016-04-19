(function () {
  'use strict';

  angular.module('ph.admin')
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
