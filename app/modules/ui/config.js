'use strict';

(function () {
  angular.module('phundusApp')
    .config(['uibDatepickerPopupConfig',
      function (uibDatepickerPopupConfig) {
        uibDatepickerPopupConfig.clearText = 'Leeren';
        uibDatepickerPopupConfig.currentText = 'Heute';
        uibDatepickerPopupConfig.closeText = 'Schliessen';
      }
    ]);
})();
