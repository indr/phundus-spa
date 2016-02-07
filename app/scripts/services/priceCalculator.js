'use strict';

angular.module('phundusApp')
  .factory('Shop', [
    function () {

      var fromUtc = new Date();
      var toUtc = new Date();
      toUtc.setDate(toUtc.getDate() + 7);

      return {
        fromUtc: fromUtc,
        toUtc: toUtc
      };
    }
  ]);

angular.module('phundusApp')
  .factory('PriceCalculator', ['Auth',
    function (Auth) {

      return function (lessorId, publicPrice, memberPrice) {

        var getPrice = function () {
          if (memberPrice && memberPrice > 0 && Auth.isMember(lessorId)) {
            return memberPrice;
          }
          return publicPrice;
        };

        var getDays = function (fromUtc, toUtc) {
          return Math.max(1, Math.ceil((toUtc - fromUtc) / (1000 * 60 * 60 * 24)));
        };

        var getTotal = function (fromUtc, toUtc, quantity, round) {
          var days = getDays(fromUtc, toUtc);
          var result = Math.round(100 * getPrice() / 7 * days * quantity) / 100;

          if (!round) {
            return result;
          }

          return Math.max(1, Math.round(result));
        };

        return {
          getDays: getDays,
          getPrice: getPrice,
          getTotal: getTotal
        }
      }
    }
  ]);
