'use strict';

/**
 * @ngdoc function
 * @name tendProgramApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the tendProgramApp
 */
angular.module('login')
  .controller('LoginCtrl', ['$scope', 'LoginService', '$location', '$rootScope', 'Session', function ($scope,LoginService, $location, $rootScope, Session) {
    
  	$scope.credentials = {};
  	$scope.login = function(){
  		$scope.submitted = true;
  		LoginService.login($scope.credentials.user,$scope.credentials.password).then(function(response){
  			Session.setSession(response);
        Session.saveSession();
        $location.path('/main');
  			console.log("response =" +response);
  		},function(error){
        $scope.loginError=true;
        console.log(error);
      });
  	}

  }]);
