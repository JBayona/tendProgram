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
   		$scope.filters = ['Locomotive Number','Date','Cause','Part','Fe','Cr','Pb','Cu','Sn','Al','Ni','Ag','Si','B','Na','Zn','TBN', 'PPM Water','Hollín','Oxidation','MT Serie Number','Visc 40C'];
 		$scope.filterByType = ['=', '>=', '<=', '>', '<'];
 		$scope.filter = [];
 		$scope.pageData = {};
 		$scope.query = "";

 		$scope.searchPage = {
 			itemsPerPageOptions : [20,40,60,80,100],
 			itemsPerPage: 20,
 			totalRows : 0,
 			currentPage : 1,
 			totalList: []
 		};

 		var filtering = function(filter){
 			$scope.searchPage.totalRows = 0;
 			$scope.searchPage.totalList = [];

 			var initRow = 0;
 			var finalRow =1000;
 			//for(var i =0; i < $scope.filter.length; i++){

 				switch(filter.name){ //Filter name
	 				case 'Locomotive Number' : filter.name = 'loconum'; break;
	 				case 'Date' : filter.name = 'fecha'; break;
	 				case 'Cause' : filter.name = 'causa'; break;
	 				case 'Part' : filter.name = 'parte'; break;
	 				case 'Fe' : filter.name = 'fe'; break;
	 				case 'Cr' : filter.name = 'cr'; break;
	 				case 'Pb' : filter.name = 'pb'; break;
	 				case 'Cu' : filter.name = 'cu'; break;
	 				case 'Sn' : filter.name = 'sn'; break;
	 				case 'Al' : filter.name = 'al'; break;
	 				case 'Ni' : filter.name = 'ni'; break;
	 				case 'Ag' : filter.name = 'ag'; break;
	 				case 'Si' : filter.name = 'si'; break;
	 				case 'B' : filter.name = 'b'; break;
	 				case 'Na' : filter.name = 'na'; break;
	 				case 'Zn' : filter.name = 'zn'; break;
	 				case 'TBN' : filter.name = 'tbn'; break;
	 				case 'PPM Water': filter.name = 'agua_ppm'; break;
	 				case 'Hollín' : filter.name = 'hollin'; break;
	 				case 'Visc 40C' : filter.name = 'visc40'; break;
 				}

				switch(filter.type){ //Filter type
	 				case '<' : filter.type = '$lt'; break;
	 				case '<=' :  filter.type = '$lte'; break; 
	 				case '>' :  filter.type = '$gt'; break;
	 				case '>=' :  filter.type = '$gte'; break; 
	 				case '=' :  ; break; 
 				}

 				//Filter value
 				if(filter.name == 'loconum' || filter.name == 'fe' || filter.name == 'cr' || filter.name == 'pb' || filter.name == 'cu' || filter.name == 'sn' || filter.name == 'sn'
 					|| filter.name == 'al' || filter.name == 'ni' || filter.name == 'ag' || filter.name == 'si' || filter.name == 'b' || filter.name == 'na' || filter.name == 'zn' ||
 					filter.name == 'tbn' || filter.name == 'agua_ppm' || filter.name == 'hollin' || filter.name == 'visc40'){
 					filter.value = parseInt(filter.value);

 					$scope.query += $scope.filter.length == 1  ? '"'+filter.name+'":{"'+filter.type+'":'+filter.value+'}' : ',"'+filter.name+'":{"'+filter.type+'":'+filter.value+'}';
 				}else{
 					$scope.query +=	$scope.filter.length == 1  ? '"'+filter.name+'":"'+filter.value+'"' : ',"'+filter.name+'":"'+filter.value+'"'
 				}

	 			Evo.getEvoFilterData(initRow,finalRow,$scope.query).then(function(response){
		 				if(response.results.length > 0){
		 					$scope.searchPage.totalRows += response.results.length;
		 					$scope.searchPage.totalList = $scope.searchPage.totalList.concat(response.results);
		 				}
	 			});
 		};

 		var promiseFilter = function(response){
 			if(response.results.length > 0){
	 			$scope.searchPage.totalRows += response.results.length;
	 			$scope.searchPage.totalList = $scope.searchPage.totalList.concat(response.results);
 			}
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

 		$scope.deleteFilter = function(index){ //Es recomendable eliminar sobre la propiedad directamente
 			

 			console.log(index);
 			/*angular.forEach($scope.filter,function(key,value){
 				if(key.delete){ //if we click the element we add a delete proerty
 					$scope.filter.splice(value, 1);
 					filtering($scope.filter);
 					//var flag = true;
 				}
 				if($scope.filter.length == 0){
 					//$scope.searchPage.totalList = "";
 					getTotalEvo();
 					$scope.query = "";
 				}
 			});*/
 			//console.log($scope.filter);
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
 			$scope.searchPage.totalRows  = 0; //We need to clean the previous result cause we modify this info with the filter functionality
		 	$scope.searchPage.totalList = []; //also we need to clean the array cause the varibale is global and we need to add new results.
 			var rows =0;
 			var initRow = 0;
 			var finalRow =1000;
 			//$scope.totalRows = 0;
 			var promises = [];
 			for (var i = 0; i < 10; i++) {
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
