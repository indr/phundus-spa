'use strict';

angular.module('phundusApp')
  .filter('organizationPlan', [
    function () {
      return function (input) {
        var plans = {
          "free": "Kostenlos",
          "membership": "Mitglied"
        };

        return plans[input] || input;
      };
    }
  ]);
