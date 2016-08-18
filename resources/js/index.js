import angular from 'angular';
import 'angular-ui-router';
import 'angularfire';
import 'angular-cookies';

// Custom Modules
import './app-core/index';

// Config
import config from './app-utils/config';

angular
  .module('app', ['ui.router', 'ngCookies', 'firebase', 'app.core'])
  .config(config)
;
// change
