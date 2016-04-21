(function () {
  'use strict';

  angular.module('ph.account')
    .controller('LogoutCtrl', LogoutCtrl);

  
  function LogoutCtrl($scope, $location, Auth) {
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
  }
})();
