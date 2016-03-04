'use strict';

/**
 * @ngdoc overview
 * @name tendProgramApp
 * @description
 * # tendProgramApp
 *
 * Main module of the application.
 */
angular
  .module('login', [
  ])
  .config(['$routeProvider', 'localStorageServiceProvider', function ($routeProvider, localStorageServiceProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        auth: true
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login',
        auth: false
      })
      .otherwise({
        redirectTo: '/'
      });
      localStorageServiceProvider.setStorageType('sessionStorage'); //Type of storage
  }]).run(['$rootScope', '$location', '$cookieStore', 'Session', 'LoginService', '$timeout', 'material', function($rootScope, $location, $cookieStore, Session,LoginService,$timeout,material){

  }]);
