(function () {
  'use strict';

  angular.module('ph.ui')
    .config(['uibDatepickerPopupConfig',
      function (uibDatepickerPopupConfig) {
        uibDatepickerPopupConfig.clearText = 'Leeren';
        uibDatepickerPopupConfig.currentText = 'Heute';
        uibDatepickerPopupConfig.closeText = 'Schliessen';
      }
    ]);
})();
