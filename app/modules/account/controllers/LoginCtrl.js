(function () {
  'use strict';

  angular.module('ph.account')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', '$location', '$window', 'Auth', 'Alert'];
  function LoginCtrl($scope, $location, $window, Auth, Alert) {
    $scope.rememberMe = false;
    $scope.login = function () {
      $scope.loginForm.$submitting = true;
      Auth.login({
          username: $scope.username,
          password: $scope.password,
          rememberme: $scope.rememberMe
        },
        function () {
          var returnUrl = $location.search().ReturnUrl;
          if (returnUrl) {
            $window.location.href = returnUrl;
          }
          else {
            //var returnPath = $location.search().returnPath || '/users/' + data.userId;
            var returnPath = $location.search().returnPath || '/';

            delete $location.search().returnPath;
            $location.path(returnPath);
          }
          $scope.loginForm.$submitting = false;
        },
        function (res) {
          $scope.loginForm.$submitting = false;
          Alert.error('Fehler bei der Anmeldung: ' + res.message);
        }
      );
    };

    $scope.range = function (min, max, step) {
      step = step || 1;
      var input = [];
      for (var i = min; i <= max; i += step) {
        input.push(i);
      }
      return input;
    };

    $scope.autoLogin = function (username, password) {
      $scope.username = username;
      $scope.password = password || '1234';
      $scope.login();
    };
  }
})();
