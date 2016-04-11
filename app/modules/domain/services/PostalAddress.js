'use strict';

(function () {
  angular.module('phundusApp')
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
})();
