'use strict';

(function () {

  angular.module('phundusApp')
    .controller('OrganizationsEditStartpageCtrl', ['$scope', 'organizationId', 'Organizations', 'Alert', '$state',
      function ($scope, organizationId, Organizations, Alert, $state) {
        $scope.data = {};

        Organizations.get({organizationId: organizationId}, function (res) {
          $scope.data.startpage = res.startpage;
        }, function () {
          Alert.error('Fehler beim Laden der Startseite.');
        });

        var goBack = function () {
          $state.go('public.organization', {organizationId: organizationId});
        };

        $scope.submit = function () {
          $scope.form.$submitting = true;
          Organizations.patch({organizationId: organizationId, startpage: $scope.data.startpage}, function () {
            $scope.form.$submitting = false;
            Alert.success('Die Startseite wurde erfolgreich gespeichert.');
            goBack();
          }, function () {
            $scope.form.$submitting = false;
            Alert.error('Fehler beim Speichern der Startseite.');
          });
        };

        $scope.cancel = goBack;
      }
    ]);
})();
