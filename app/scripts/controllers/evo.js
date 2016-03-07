'use strict';

/**
 * @ngdoc function
 * @name tendProgramApp.controller:EvoCtrl
 * @description
 * # EvoCtrl
 * Controller of the tendProgramApp
 */
angular.module('tendProgramApp')
  .controller('EvoCtrl',['$scope' ,'Evo',function ($scope,Evo) {
   		$scope.filters = ['Locomotive Number','Date','Cause','Part','Fe','Cr','Pb','Cu','Sn','Al','Ni','Ag','Si','B','Na','Zn','TBN', 'PPM Water','Hollín','Oxidation','MT Serie Number'];
 		$scope.filterByType = ['=', '>=', '<=', '>', '<'];
 		$scope.filter = [];
 		$scope.pageData = {};

 		$scope.addFilter = function(filter){
 			if(validateInput(filter)){
 				$scope.filter.push({name: filter.name, type: filter.type, value: filter.value});
 				$scope.filter.name = "";
 				$scope.filter.type = "";
 				$scope.filter.value = "";
 			}
 		};

 		var validateInput = function(filter){
 			if(filter.name !== null && filter.name !== undefined && filter.name !== "" &&
 				filter.type !== null && filter.type !== undefined && filter.type != "" &&
 				filter.value !== null && filter.value !== undefined && filter.value != "" ){
 				return true;
 			}
 			return false;
 		};

 		$scope.deleteFilter = function(){
 			angular.forEach($scope.filter,function(key,value){
 				if(key.delete){
 					$scope.filter.splice(value, 1);
 				}
 			});
 		};

 		var getEvo = function(){
 			Evo.getEvoInfo().then(function(response){
 				//console.log(response);
 				$scope.pageData.evo = response.results;
 			});
 		}


 		//init routines
 		getEvo();

 }]);
