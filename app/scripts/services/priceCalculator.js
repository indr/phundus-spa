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
  ])

  .factory('PostalAddress', [
    function () {
      var fromFirstAndLastName = function (firstName, lastName, street, postcode, city) {
        return firstName + ' ' + lastName + '\n' + street + '\n' + postcode + ' ' + city;
      };
      var fromLines = function (contact) {
        return contact.line1 + '\n' + (contact.line2 ? contact.line2 + '\n' : '') + contact.street + '\n' + contact.postcode + ' ' + contact.city;
      };
      return {
        fromFirstAndLastName: fromFirstAndLastName,
        fromLines: fromLines
      }
    }
  ])

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
