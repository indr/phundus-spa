'use strict';

(function () {
  angular.module('ph.account')
    .controller('LogoutCtrl', ['$scope', '$location', '$window', 'Auth',
      function ($scope, $location, $window, Auth) {

        if (Auth.isLoggedIn) {
          Auth.logout(function () {
              $location.path('/logged-out');
            },
            function (err) {
              var message = 'Der Server hat nicht geantwortet.';
              if (err) {
                message = err.message;
              }
              $scope.errorMessage = 'Fehler bei der Abmeldung: ' + message;
            });
        }
        else {
          $location.path('/logged-out');
        }
      }]);
})();
