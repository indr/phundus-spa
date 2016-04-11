'use strict';

(function () {

  angular.module('phundusApp')
    .controller('MetaValidateCtrl', ['$scope', 'Auth', 'Alert', 'Validate', 'key', '$timeout',
      function ($scope, Auth, Alert, Validate, key, $timeout) {
        $scope.validate = {
          key: key
        };
        $scope.submitted = false;

        $scope.submit = function () {
          $scope.form.$submitting = true;
          Validate.post($scope.validate, function () {
            $scope.form.$submitting = false;
            $scope.submitted = true;
          }, function () {
            $scope.form.$submitting = false;
            Alert.error('Fehler beim Validieren des Keys.');
          });
        };

        if (key !== undefined) {
          $timeout($scope.submit);
        }
      }
    ]);

})();
