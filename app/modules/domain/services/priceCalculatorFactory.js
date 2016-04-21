(function () {
  'use strict';

  angular.module('ph.domain')
    .factory('priceCalculatorFactory', priceCalculatorFactory);


  function priceCalculatorFactory(Auth) {
    return function (lessorId, publicPrice, memberPrice) {
      return {
        getDays: getDays,
        getPrice: getPrice,
        getTotal: getTotal
      };

      function getPrice() {
        if (memberPrice && memberPrice > 0 && Auth.isMember(lessorId)) {
          return memberPrice;
        }
        return publicPrice;
      }

      function getDays(fromUtc, toUtc) {
        return Math.max(1, Math.ceil((toUtc - fromUtc) / (1000 * 60 * 60 * 24)));
      }

      function getTotal(fromUtc, toUtc, quantity, round) {
        var days = getDays(fromUtc, toUtc);
        var result = Math.round(100 * getPrice() / 7 * days * quantity) / 100;

        if (!round) {
          return result;
        }

        return Math.max(1, Math.round(result));
      }
    }
  }
})();
