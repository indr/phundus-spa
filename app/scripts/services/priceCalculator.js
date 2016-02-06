'use strict';

angular.module('phundusApp')
  .factory('PriceCalculator', ['Auth',
    function (Auth) {

      return function (lessorId, publicPrice, memberPrice) {

        var getPrice = function () {
          if (memberPrice && Auth.isMember(lessorId)) {
            return memberPrice;
          }
          return publicPrice;
        };

        var getTotal = function (fromUtc, toUtc, quantity, round) {
          var days = Math.max(1, Math.ceil((toUtc - fromUtc) / (1000 * 60 * 60 * 24)));
          var result = Math.round(100 * getPrice() / 7 * days * quantity) / 100;

          if (!round) {
            return result;
          }

          return Math.max(1, Math.round(result));
        };

        return {
          getPrice: getPrice,
          getTotal: getTotal
        }
      }
    }
  ]);
