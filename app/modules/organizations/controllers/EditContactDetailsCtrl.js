(function () {
  'use strict';

  angular.module('ph.organizations')
    .controller('OrganizationsEditContactDetailsCtrl', OrganizationsEditContactDetailsCtrl);


  function OrganizationsEditContactDetailsCtrl(_, $scope, organizationId, Organizations, Alert, $state) {
    $scope.contactDetails = null;

    Organizations.get({organizationId: organizationId}, function (res) {
      var contactDetails = res.contact;
      contactDetails.postcode = parseInt(contactDetails.postcode);
      $scope.contactDetails = contactDetails;
    }, function () {
      Alert.error('Fehler beim Laden der Kontaktdetails.');
    });

    var goBack = function () {
      $state.go('organization.home', {organizationId: organizationId});
    };

    $scope.submit = function () {
      $scope.form.$submitting = true;
      Organizations.patch({organizationId: organizationId, contactDetails: $scope.contactDetails}, function () {
        $scope.form.$submitting = false;
        Alert.success('Die Kontaktdetails wurde erfolgreich gespeichert.');
        goBack();
      }, function () {
        $scope.form.$submitting = false;
        Alert.error('Fehler beim Speichern der Kontaktdetails.');
      });

    };
    $scope.cancel = goBack;
  }
})();
