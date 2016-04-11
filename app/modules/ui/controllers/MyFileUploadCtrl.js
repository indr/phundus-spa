'use strict';

(function () {
  angular.module('ph.ui')
    .controller('MyFileUploadCtrl', ['_', '$scope', '$http', 'Alert', '$filter', '$window', '$timeout',
      function (_, $scope, $http, Alert) {
        var url = $scope.url;
        $scope.options = {
          url: url
        };
        $scope.loadingFiles = true;
        $http.get(url)
          .then(
          function (response) {
            $scope.loadingFiles = false;
            $scope.queue = response.data.files || [];
          },
          function () {
            $scope.loadingFiles = false;
          }
        );
        $scope.toggleIsPreview = function (file) {
          $scope.isPreviewSubmitting = file.isPreviewSubmitting = true;
          $http.patch(url + '/' + file.name, {isPreview: file.isPreview})
            .then(function () {

              $scope.isPreviewSubmitting = file.isPreviewSubmitting = false;
              _.forEach($scope.queue, function (each) {
                each.isPreview = file === each;
              });
            }, function () {
              $scope.isPreviewSubmitting = file.isPreviewSubmitting = false;
              file.isPreview = false;
              Alert.error('Fehler beim Setzen als Vorschaubild.');
            }
          );
        };
      }
    ])
})();
