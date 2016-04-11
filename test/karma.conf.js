// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-07-23 using
// generator-karma 1.0.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/jquery-ui/ui/widget.js',
      // bower:js
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-gravatar/build/angular-gravatar.js',
      'bower_components/angular-simple-logger/dist/angular-simple-logger.js',
      'bower_components/leaflet/dist/leaflet-src.js',
      'bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-smart-table/dist/smart-table.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/lodash/lodash.js',
      'bower_components/blueimp-file-upload/js/jquery.fileupload.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/angular-bootstrap-confirm/dist/angular-bootstrap-confirm.js',
      'bower_components/tinymce-dist/tinymce.js',
      'bower_components/angular-ui-tinymce/src/tinymce.js',
      'bower_components/moment/moment.js',
      'bower_components/angular-moment/angular-moment.js',
      'bower_components/holderjs/holder.js',
      'bower_components/angular-holderjs/src/holder.js',
      'bower_components/chartjs/Chart.js',
      'bower_components/angular-chartjs-directive/chartjs-directive.js',
      'bower_components/angularjs-viewhead/angularjs-viewhead.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      "bower_components/blueimp-load-image/js/load-image.all.min.js",
      "bower_components/blueimp-canvas-to-blob/js/canvas-to-blob.min.js",
      "bower_components/blueimp-gallery/js/jquery.blueimp-gallery.min.js",
      "bower_components/blueimp-file-upload/js/jquery.iframe-transport.js",
      "bower_components/blueimp-file-upload/js/jquery.fileupload.js",
      "bower_components/blueimp-file-upload/js/jquery.fileupload-process.js",
      "bower_components/blueimp-file-upload/js/jquery.fileupload-image.js",
      "bower_components/blueimp-file-upload/js/jquery.fileupload-audio.js",
      "bower_components/blueimp-file-upload/js/jquery.fileupload-video.js",
      "bower_components/blueimp-file-upload/js/jquery.fileupload-ui.js",
      "bower_components/blueimp-file-upload/js/jquery.fileupload-validate.js",
      "bower_components/blueimp-file-upload/js/jquery.fileupload-angular.js",
      "app/scripts/common/services/routingConfig.js",
      "app/scripts/app.js",
      "app/scripts/**/*.js",
      "test/mock/**/*.js",
      "test/spec/**/*.js"
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS"
    ],

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine"
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
