(function () {
  'use strict';

  angular.module('ph.feedback')
    .controller('FeedbackCtrl', FeedbackCtrl);

  FeedbackCtrl.$inject = ['$scope', 'Auth', 'Alert', 'Feedback'];
  function FeedbackCtrl($scope, Auth, Alert, Feedback) {
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
})();
