'use strict';

/**
 * @ngdoc function
 * @name tendProgramApp.controller:ResetCtrl
 * @description
 * # ResetCtrl
 * Controller of the tendProgramApp
 */
angular.module('login')
  .controller('ResetCtrl', ['$scope', 'LoginService',function ($scope,LoginService) {
   	$scope.credentials = {};
   	$scope.reset = function(){
   		$scope.submitted = true;
   		LoginService.reset();
   	};
  }]);
