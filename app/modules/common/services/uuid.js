(function () {
  'use strict';

  // https://github.com/ajsd/angular-uuid

  angular.module('ph.common')
    .service('uuid4', function () {
      /**! http://stackoverflow.com/a/2117523/377392 */
      var fmt = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
      this.generate = function () {
        return fmt.replace(/[xy]/g, function (c) {
          var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      };
    });
})();
