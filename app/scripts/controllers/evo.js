'use strict';

/**
 * @ngdoc function
 * @name tendProgramApp.controller:EvoCtrl
 * @description
 * # EvoCtrl
 * Controller of the tendProgramApp
 */
angular.module('tendProgramApp')
  .controller('EvoCtrl',['$scope' ,'Evo', '$q',function ($scope,Evo,$q) {
   		$scope.filters = ['Locomotive Number','Date','Cause','Part','Fe','Cr','Pb','Cu','Sn','Al','Ni','Ag','Si','B','Na','Zn','TBN', 'PPM Water','Hollín','Oxidation','MT Serie Number'];
 		$scope.filterByType = ['=', '>=', '<=', '>', '<'];
 		$scope.filter = [];
 		$scope.pageData = {};

 		$scope.searchPage = {
 			itemsPerPageOptions : [20,40,60,80,100],
 			itemsPerPage: 20,
 			totalRows : 0,
 			currentPage : 1,
 			totalList: []
 		};

 		var filtering = function(filter){
 			console.log("testing");
 		};

 		$scope.addFilter = function(filter){
 			if(validateInput(filter)){
 				$scope.filter.push({name: filter.name, type: filter.type, value: filter.value});
 				filtering($scope.filter);
 				//$scope.filter.name = "";
 				//$scope.filter.type = "";
 				//$scope.filter.value = "";
 				console.log($scope.filter);
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
 				console.log(response);
 				$scope.pageData.evo = response.results;
 			});
 		};

 		var promiseHandler = function(response){
 			if(response.results.length > 0){
	 			$scope.searchPage.totalRows += response.results.length;
	 			$scope.searchPage.totalList = $scope.searchPage.totalList.concat(response.results);
 			}
 		};


 		var getTotalEvo = function(){
 			var rows =0;
 			var initRow = 0;
 			var finalRow =1000;
 			//$scope.totalRows = 0;
 			var promises = [];
 			for (var i = 0; i < 5; i++) {
 				var promise = Evo.getEvoInfoTotal(initRow,finalRow).then(promiseHandler);
 				promises.push(promise);
 				initRow += 1000;
		 		finalRow += 1000;
 			};

 			$q.all(promises).then(function(){
 				//console.log($scope.totalRows);
 				$scope.$emit('totalrows', $scope.searchPage.totalRows);
 			});

 			/*for(var i=0; i < 10; i++){
 				Evo.getEvoInfoTotal(initRow,finalRow).then(function(response){
	 					$scope.totalRows += response.results.length;
 				});
 				initRow += 1000;
		 		finalRow += 1000;
 			}
 			*/
 		};

 		//init routines
 		//getEvo();
 		getTotalEvo();
 		$scope.$on('totalrows', function(e, totalRows){
 			console.log(totalRows);
 		});

 }]);
