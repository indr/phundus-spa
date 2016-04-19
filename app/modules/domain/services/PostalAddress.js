(function () {
  'use strict';

  angular.module('ph.domain')
    .factory('PostalAddress', postalAddress);

  function postalAddress() {
    return {
      fromFirstAndLastName: fromFirstAndLastName,
      fromLines: fromLines
    };

    function fromFirstAndLastName(firstName, lastName, street, postcode, city) {
      return firstName + ' ' + lastName + '\n' + street + '\n' + postcode + ' ' + city;
    }

    function fromLines(contact) {
      return contact.line1 + '\n' + (contact.line2 ? contact.line2 + '\n' : '') + contact.street + '\n' + contact.postcode + ' ' + contact.city;
    }
  }
})();
