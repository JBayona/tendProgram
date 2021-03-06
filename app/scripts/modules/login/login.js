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
        templateUrl: 'views/evo.html',
        controller: 'EvoCtrl',
        auth: true
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        auth: false
      })
      .when('/evo', {
        templateUrl: 'views/evo.html',
        controller: 'EvoCtrl',
        auth: true
      })
      .when('/ac', {
        templateUrl: 'views/ac.html',
        controller: 'AcCtrl',
        auth: true
      })
      .otherwise({
        redirectTo: '/'
      });
      localStorageServiceProvider.setStorageType('sessionStorage'); //Type of storage
  }])
  //The run is a kick start of the application
  .run(['$rootScope','$location','$cookieStore','Session','LoginService','$timeout','material',function($rootScope,$location,$cookieStore,Session,LoginService,$timeout,material){
    material.init(); //We load the material design library when the application runs
    $rootScope.logout = function(){
      Session.logout();
    };
    $rootScope.passwordReset = function(){
      $rootScope.resetConfirmation = true;
      LoginService.reset($rootScope.session.email).then(function(){
        $timeout(function(){
            $rootScope.resetConfirmation = false;
          },3000);
      });
    };
     //Prevent unauthorized access, in this section we handle the user login
    $rootScope.$on('$routeChangeStart', function (event, next) {
        $rootScope.activeMenu = $location.url();
        if($location.url() === '/login'){
          return;
        }
        var userAuthenticated = false;
        if(Session.hasSession()){
          userAuthenticated = true;
        }

        if (!userAuthenticated && next.auth ) {
            /* You can save the user's location to take him back to the same page after he has logged-in */
            $rootScope.savedLocation = $location.url();

            $location.path('/login');
        }else if(next.auth){
          Session.tokenValidate().then(function(response){
            if(!response.sessionToken){
              $location.path('/login');
            }
          },function(error){
            $location.path('/login');
          });  
        }
        
    });
  }]);