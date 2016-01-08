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
        });
      }
    }
  ]);
