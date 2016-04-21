(function () {
  'use strict';

  angular.module('ph.organizations')
    .controller('OrganizationsSettingsCtrl', OrganizationsSettingsCtrl);


  function OrganizationsSettingsCtrl(_, $scope, organizationId, OrganizationSettings, Alert, $http) {

    OrganizationSettings.get({organizationId: organizationId}, function (res) {
      $scope.publicFormReset = _.pick(res, ['organizationId', 'publicRental']);
      $scope.publicFormModel = angular.copy($scope.publicFormReset);

      $scope.pdfTemplateFormReset = _.pick(res, ['organizationId', 'pdfTemplate']);
      $scope.pdfTemplateFormModel = angular.copy($scope.pdfTemplateFormReset);

      $http.get('/api/v0/organizations/' + organizationId + '/files')
        .success(function (data) {
          $scope.files = _.filter(data.files, {'type': 'pdf'});
        });
    }, function (res) {
      Alert.error('Fehler beim Laden der Einstellungen: ' + (angular.isDefined(res.message) ? res.message : 'Unbekannter Fehler.'));

    });

    $scope.submit = function (form, model) {
      form.$submitting = true;
      OrganizationSettings.patch(model, function () {
        form.$submitting = false;
        Alert.success('Die Einstellungen wurden erfolgreich gespeichert.');
      }, function (res) {
        form.$submitting = false;
        Alert.error('Fehler beim Speichern der Einstellungen: ' + (angular.isDefined(res.message) ? res.message : 'Unbekannter Fehler.'));
      });
    };
    $scope.reset = function (formModel, resetModel) {
      angular.copy(resetModel, formModel);
    };
  }
})();
