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
 		$scope.filterTemp = [];
 		$scope.pageData = {};
 		$scope.query = "";

 		$scope.searchPage = {
 			itemsPerPageOptions : [20,40,60,80,100],
 			itemsPerPage: 20,
 			totalRows : 0,
 			currentPage : 1,
 			totalList: []
 		};

 		var filtering = function(filter, index){
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
 					filter.value = parseFloat(filter.value);

	 					if($scope.filter.length == 1 || index == 0){
	 						$scope.query += '"'+filter.name+'":{"'+filter.type+'":'+filter.value+'}'
	 					}else{
	 						$scope.query += ',"'+filter.name+'":{"'+filter.type+'":'+filter.value+'}';
	 					}

 					 //$scope.query += $scope.filter.length == 1  ? '"'+filter.name+'":{"'+filter.type+'":'+filter.value+'}' : ',"'+filter.name+'":{"'+filter.type+'":'+filter.value+'}';
 				}else{
 						if($scope.filter.length == 1 || index == 0){
 							$scope.query += '"'+filter.name+'":"'+filter.value+'"';
 						}else{
 							$scope.query += ',"'+filter.name+'":"'+filter.value+'"';
 						}
 					//$scope.query +=	$scope.filter.length == 1  ? '"'+filter.name+'":"'+filter.value+'"' : ',"'+filter.name+'":"'+filter.value+'"'
 				}

 				if(index == $scope.filter.length -1){
 					Evo.getEvoFilterData(initRow,finalRow,$scope.query).then(function(response){
			 				if(response.results.length > 0){
			 					$scope.searchPage.totalRows += response.results.length;
			 					$scope.searchPage.totalList = $scope.searchPage.totalList.concat(response.results);
			 				}
	 				});
 				}

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
 				//$scope.filterTemp = angular.copy($scope.filter);
 				filtering($scope.filter,$scope.filter.length-1);
 				//Clear the models in order to show blank spaces in the search section
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

 		$scope.deleteFilter = function(index){ //Es recomendable eliminar sobre la propiedad directamente
 			
 			console.log(index);
 			$scope.filter.splice(index,1);
 			//$scope.filterTemp = angular.copy($scope.filter);
 			$scope.query = "";
 			if($scope.filter.length == 0){
 					//$scope.searchPage.totalList = "";
 					getTotalEvo();
 					$scope.query = "";
 			}else{
 				for(var i = 0; i < $scope.filter.length; i++){
 					filtering($scope.filter[i], i);
 					switch($scope.filter[i].name){ //Filter name
		 				case 'loconum' : $scope.filter[i].name = 'Locomotive Number'; break; 
		 				case 'fecha' : $scope.filter[i].name = 'Date'; break;
		 				case 'causa' : $scope.filter[i].name = 'Cause'; break;
		 				case 'parte' : $scope.filter[i].name = 'Part'; break;
		 				case 'fe' : $scope.filter[i].name = 'Fe'; break;
		 				case 'cr' : $scope.filter[i].name = 'Cr'; break;
		 				case 'pb' : $scope.filter[i].name = 'Bb'; break;
		 				case 'cu' : $scope.filter[i].name = 'Cu'; break;
		 				case 'sn' : $scope.filter[i].name = 'Sn'; break;
		 				case 'al' : $scope.filter[i].name = 'Al'; break;
		 				case 'ni' : $scope.filter[i].name = 'Ni'; break;
		 				case 'ag' : $scope.filter[i].name = 'Ag'; break;
		 				case 'si' : $scope.filter[i].name = 'Si'; break;
		 				case 'b' : $scope.filter[i].name = 'B'; break;
		 				case 'na' : $scope.filter[i].name = 'Na'; break;
		 				case 'zn' : $scope.filter[i].name = 'Zn'; break;
		 				case 'tbn' : $scope.filter[i].name = 'TBN'; break;
		 				case 'agua_ppm': $scope.filter[i].name = 'PPM Water'; break;
		 				case 'hollin' : $scope.filter[i].name = 'Hollín'; break;
		 				case 'visc40' : $scope.filter[i].name = 'Visc 40'; break;
 					}
					switch($scope.filter[i].type){ //Filter type
		 				case '$lt' : $scope.filter[i].type = '<'; break;
		 				case '$lte' :  $scope.filter[i].type = '<='; break; 
		 				case '$gt' :  $scope.filter[i].type = '>'; break;
		 				case '$gte' :  $scope.filter[i].type = '>='; break; 
		 				case '=' :  ; break; 
	 				}
 				}
 			}

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
