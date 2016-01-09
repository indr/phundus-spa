'use strict';

angular.module('phundusApp')
  .controller('MetaFeedbackCtrl', ['$scope', 'Auth', 'Alert', 'Feedback',
    function ($scope, Auth, Alert, Feedback) {
      $scope.feedback = {
        emailAddress: Auth.user.username || undefined
      };
      $scope.submitted = false;

      $scope.submit = function () {
        $scope.form.$submitting = true;
        Feedback.post($scope.feedback, function () {
          $scope.form.$submitting = false;
          $scope.submitted = true;
        }, function () {
          $scope.form.$submitting = false;
          Alert.error('Fehler beim Senden des Feedbacks.');
        });
      }
    }
  ]);

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
