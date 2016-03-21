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
 		$scope.dateArray = {
 			tolva1 : [],
 			tolva2 : [],
 			tolva3 : [],
 			tolva4 : [],
 			tolva5 : [],
 			tolva6 : [],
 			comp : [],
 			md : []
 		};
 		$scope.partType = {
 			tolva1 : [],
 			tolva2 : [],
 			tolva3 : [],
 			tolva4 : [],
 			tolva5 : [],
 			tolva6 : [],
 			comp : [],
 			md : []
 		};
 		$scope.datePart = {
 			tolva1 : [],
 			tolva2 : [],
 			tolva3 : [],
 			tolva4 : [],
 			tolva5 : [],
 			tolva6 : [],
 			comp : [],
 			md : []
 		};
 		$scope.searchPage = {
 			itemsPerPageOptions : [20,40,60,80,100],
 			itemsPerPage: 20,
 			totalRows : 0,
 			currentPage : 1,
 			totalList: []
 		};
 		var isFilterDate = 0;
 		var valueDate;

 		var filtering = function(filter, index){
 			$scope.searchPage.totalRows = 0;
 			$scope.searchPage.totalList = [];

 			var initRow = 0;
 			var finalRow =1000;
 			//for(var i =0; i < $scope.filter.length; i++){

 				switch(filter.name){ //Filter name
	 				case 'Locomotive Number' : filter.name = 'loconum'; break;
	 				case 'Date' : filter.name = 'fecha'; isFilterDate +=1; valueDate = filter.value; break;
	 				case 'Cause' : filter.name = 'causa'; break;
	 				case 'Part' : filter.name = 'parte'; isFilterDate +=1; break;
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

 				if(isFilterDate == 2){
 					for(var i=0; i < $scope.filter.length; i++){
 						if($scope.filter[i].name == 'parte' || $scope.filter[i].name == 'Part'){ //604800000
 							if($scope.filter[i].value != "" && $scope.filter[i].value != null ){
 								switch($scope.filter[i].value){
 									case 'TOLVA1' : getTolvaOne(); break;
 									case 'TOLVA2' : getTolvaTwo(); break;
 									case 'TOLVA3' : getTolvaThree(); break;
 									case 'TOLVA4' : getTolvaFour(); break;
 									case 'TOLVA5' : getTolvaFive(); break;
 									case 'TOLVA6' : getTolvaSix(); break;
 									case 'MD' : getMD(); break;
 									case 'COMP' : getComp(); break;
 								}
 							}
 						}
 					}
 				}

 				if(index == $scope.filter.length -1 && isFilterDate != 2){
 					Evo.getEvoFilterData(initRow,finalRow,$scope.query).then(function(response){
			 				if(response.results.length > 0){
			 					$scope.searchPage.totalRows += response.results.length;
			 					$scope.searchPage.totalList = $scope.searchPage.totalList.concat(response.results);
			 				}
	 				});
 				}

 		};

 		var getCurrentDate = function(){
 			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();

			if(dd<10) {
    			dd='0'+dd
			} 

			if(mm<10) {
    			mm='0'+mm
			} 

			return dd+'/'+mm+'/'+yyyy;
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
 			if($scope.filter[index].name == 'fecha' || $scope.filter[index].name == 'Date'){
 				isFilterDate =0;
 				valueDate = "";
 			}else if($scope.filter[index].name == 'Part' || $scope.filter[index].name == 'parte'){
 				isFilterDate =0;
 			}


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

 		var parseDate = function(date){
 			var parsedDate = date.split('-');
 			var day = parsedDate[0];
 			var month = parsedDate[1];
 			var year = parsedDate[2];

 			switch(month){
 				case "Jan" : month = '01'; break;
 				case "Feb" : month = '02'; break;
 				case "Mar" : month = '03'; break;
 				case "Apr" : month = '04'; break;
 				case "May" : month = '05'; break;
 				case "Jun" : month = '06'; break;
 				case "Jul" : month = '07'; break;
 				case "Aug" : month = '08'; break;
 				case "Sep" : month = '09'; break;
 				case "Oct" : month = '10'; break;
 				case "Nov" : month = '11'; break;
 				case "Dec" : month = '12'; break;

 			}

 			return day+"-"+month+"-"+year;
 		}


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
 		};


 		var getTolvaOne = function(){
 			var index = 0;
 			var dateFirst = null;
 			var dateSecond = null;
 			var momentFirst = null;
 			var momentSecond = null;

 			var currentDate = null;
 			var filterDate = null;
 			var differenceDate = null;

 			Evo.getTolva_OneDate().then(function(response){
 				$scope.dateArray.tolva1 = response.results;
 				//Create the first insert
 				$scope.partType.tolva1[index] = $scope.dateArray.tolva1[0];
 				for(var i=0; i < $scope.dateArray.tolva1.length; i++ ){
 					if($scope.partType.tolva1[index].loconum == $scope.dateArray.tolva1[i].loconum){
 						//Parse date in format dd/mm/yy
 						dateFirst = parseDate($scope.partType.tolva1[index].fecha);
 						dateSecond = parseDate($scope.dateArray.tolva1[i].fecha);
 						momentFirst = moment(dateFirst, "DD-MM-YYYY");
 						momentSecond = moment(dateSecond, "DD-MM-YYYY");
 						if(momentFirst.isAfter(momentSecond)){
 							$scope.partType.tolva1[index] = $scope.partType.tolva1[index]
 						}else{
 							$scope.partType.tolva1[index] = $scope.dateArray.tolva1[i]
 						}
 					}else{
 						index++;
 						$scope.partType.tolva1[index] = $scope.dateArray.tolva1[i];
 					}
 				}
 			}).then(function(result){
 				var indexDate = 0;
 				//Get the results depending the date filter
 				for(var i=0; i < $scope.partType.tolva1.length; i++){
 					currentDate = moment().format("DD-MM-YYYY");
 					filterDate = parseDate($scope.partType.tolva1[i].fecha);
 					currentDate = moment(currentDate, "DD-MM-YYYY");
 					filterDate = moment(filterDate, "DD-MM-YYYY");
 					//Getting the difference date from now to date
 					differenceDate = currentDate.diff(filterDate, 'months');
 					if(differenceDate > valueDate){
 						$scope.datePart.tolva1[indexDate] = $scope.partType.tolva1[i];
 						indexDate++;
 					}
 				}
 				$scope.searchPage.totalList = [];
 				$scope.searchPage.totalRows += $scope.datePart.tolva1.length;
				$scope.searchPage.totalList = $scope.datePart.tolva1;
 			});
 		};


 		var getTolvaTwo = function(){
 			var index = 0;
 			var dateFirst = null;
 			var dateSecond = null;
 			var momentFirst = null;
 			var momentSecond = null;

 			var currentDate = null;
 			var filterDate = null;
 			var differenceDate = null;

 			Evo.getTolva_TwoDate().then(function(response){
 				$scope.dateArray.tolva2 = response.results;
 				//Create the first insert
 				$scope.partType.tolva2[index] = $scope.dateArray.tolva2[0];
 				for(var i=0; i < $scope.dateArray.tolva2.length; i++ ){
 					if($scope.partType.tolva2[index].loconum == $scope.dateArray.tolva2[i].loconum){
 						//Parse date in format dd/mm/yy
 						dateFirst = parseDate($scope.partType.tolva2[index].fecha);
 						dateSecond = parseDate($scope.dateArray.tolva2[i].fecha);
 						momentFirst = moment(dateFirst, "DD-MM-YYYY");
 						momentSecond = moment(dateSecond, "DD-MM-YYYY");
 						if(momentFirst.isAfter(momentSecond)){
 							$scope.partType.tolva2[index] = $scope.partType.tolva2[index]
 						}else{
 							$scope.partType.tolva2[index] = $scope.dateArray.tolva2[i]
 						}
 					}else{
 						index++;
 						$scope.partType.tolva2[index] = $scope.dateArray.tolva2[i];
 					}
 				}
 			}).then(function(result){
 				var indexDate = 0;
 				//Get the results depending the date filter
 				for(var i=0; i < $scope.partType.tolva2.length; i++){
 					currentDate = moment().format("DD-MM-YYYY");
 					filterDate = parseDate($scope.partType.tolva2[i].fecha);
 					currentDate = moment(currentDate, "DD-MM-YYYY");
 					filterDate = moment(filterDate, "DD-MM-YYYY");
 					//Getting the difference date from now to date
 					differenceDate = currentDate.diff(filterDate, 'months');
 					if(differenceDate > valueDate){
 						$scope.datePart.tolva2[indexDate] = $scope.partType.tolva2[i];
 						indexDate++;
 					}
 				}
 				$scope.searchPage.totalList = [];
 				$scope.searchPage.totalRows += $scope.datePart.tolva2.length;
				$scope.searchPage.totalList = $scope.datePart.tolva2;
 			});
 		};

 		var getTolvaThree = function(){
 			var index = 0;
 			var dateFirst = null;
 			var dateSecond = null;
 			var momentFirst = null;
 			var momentSecond = null;

 			var currentDate = null;
 			var filterDate = null;
 			var differenceDate = null;

 			Evo.getTolva_ThreeDate().then(function(response){
 				$scope.dateArray.tolva3 = response.results;
 				//Create the first insert
 				$scope.partType.tolva3[index] = $scope.dateArray.tolva3[0];
 				for(var i=0; i < $scope.dateArray.tolva3.length; i++ ){
 					if($scope.partType.tolva3[index].loconum == $scope.dateArray.tolva3[i].loconum){
 						//Parse date in format dd/mm/yy
 						dateFirst = parseDate($scope.partType.tolva3[index].fecha);
 						dateSecond = parseDate($scope.dateArray.tolva3[i].fecha);
 						momentFirst = moment(dateFirst, "DD-MM-YYYY");
 						momentSecond = moment(dateSecond, "DD-MM-YYYY");
 						if(momentFirst.isAfter(momentSecond)){
 							$scope.partType.tolva3[index] = $scope.partType.tolva3[index]
 						}else{
 							$scope.partType.tolva3[index] = $scope.dateArray.tolva3[i]
 						}
 					}else{
 						index++;
 						$scope.partType.tolva3[index] = $scope.dateArray.tolva3[i];
 					}
 				}
 			}).then(function(result){
 				var indexDate = 0;
 				//Get the results depending the date filter
 				for(var i=0; i < $scope.partType.tolva3.length; i++){
 					currentDate = moment().format("DD-MM-YYYY");
 					filterDate = parseDate($scope.partType.tolva3[i].fecha);
 					currentDate = moment(currentDate, "DD-MM-YYYY");
 					filterDate = moment(filterDate, "DD-MM-YYYY");
 					//Getting the difference date from now to date
 					differenceDate = currentDate.diff(filterDate, 'months');
 					if(differenceDate > valueDate){
 						$scope.datePart.tolva3[indexDate] = $scope.partType.tolva3[i];
 						indexDate++;
 					}
 				}
 				$scope.searchPage.totalList = [];
 				$scope.searchPage.totalRows += $scope.datePart.tolva3.length;
				$scope.searchPage.totalList = $scope.datePart.tolva3;
 			});
 		};

 		var getTolvaFour = function(){
 			var index = 0;
 			var dateFirst = null;
 			var dateSecond = null;
 			var momentFirst = null;
 			var momentSecond = null;

 			var currentDate = null;
 			var filterDate = null;
 			var differenceDate = null;

 			Evo.getTolva_FourDate().then(function(response){
 				$scope.dateArray.tolva4 = response.results;
 				//Create the first insert
 				$scope.partType.tolva4[index] = $scope.dateArray.tolva4[0];
 				for(var i=0; i < $scope.dateArray.tolva4.length; i++ ){
 					if($scope.partType.tolva4[index].loconum == $scope.dateArray.tolva4[i].loconum){
 						//Parse date in format dd/mm/yy
 						dateFirst = parseDate($scope.partType.tolva4[index].fecha);
 						dateSecond = parseDate($scope.dateArray.tolva4[i].fecha);
 						momentFirst = moment(dateFirst, "DD-MM-YYYY");
 						momentSecond = moment(dateSecond, "DD-MM-YYYY");
 						if(momentFirst.isAfter(momentSecond)){
 							$scope.partType.tolva4[index] = $scope.partType.tolva4[index]
 						}else{
 							$scope.partType.tolva4[index] = $scope.dateArray.tolva4[i]
 						}
 					}else{
 						index++;
 						$scope.partType.tolva4[index] = $scope.dateArray.tolva4[i];
 					}
 				}
 			}).then(function(result){
 				var indexDate = 0;
 				//Get the results depending the date filter
 				for(var i=0; i < $scope.partType.tolva4.length; i++){
 					currentDate = moment().format("DD-MM-YYYY");
 					filterDate = parseDate($scope.partType.tolva4[i].fecha);
 					currentDate = moment(currentDate, "DD-MM-YYYY");
 					filterDate = moment(filterDate, "DD-MM-YYYY");
 					//Getting the difference date from now to date
 					differenceDate = currentDate.diff(filterDate, 'months');
 					if(differenceDate > valueDate){
 						$scope.datePart.tolva4[indexDate] = $scope.partType.tolva4[i];
 						indexDate++;
 					}
 				}
 				$scope.searchPage.totalList = [];
 				$scope.searchPage.totalRows += $scope.datePart.tolva4.length;
				$scope.searchPage.totalList = $scope.datePart.tolva4;
 			});
 		};

 		var getTolvaFive = function(){
 			var index = 0;
 			var dateFirst = null;
 			var dateSecond = null;
 			var momentFirst = null;
 			var momentSecond = null;

 			var currentDate = null;
 			var filterDate = null;
 			var differenceDate = null;

 			Evo.getTolva_FiveDate().then(function(response){
 				$scope.dateArray.tolva5 = response.results;
 				//Create the first insert
 				$scope.partType.tolva5[index] = $scope.dateArray.tolva5[0];
 				for(var i=0; i < $scope.dateArray.tolva5.length; i++ ){
 					if($scope.partType.tolva5[index].loconum == $scope.dateArray.tolva5[i].loconum){
 						//Parse date in format dd/mm/yy
 						dateFirst = parseDate($scope.partType.tolva5[index].fecha);
 						dateSecond = parseDate($scope.dateArray.tolva5[i].fecha);
 						momentFirst = moment(dateFirst, "DD-MM-YYYY");
 						momentSecond = moment(dateSecond, "DD-MM-YYYY");
 						if(momentFirst.isAfter(momentSecond)){
 							$scope.partType.tolva5[index] = $scope.partType.tolva5[index]
 						}else{
 							$scope.partType.tolva5[index] = $scope.dateArray.tolva5[i]
 						}
 					}else{
 						index++;
 						$scope.partType.tolva5[index] = $scope.dateArray.tolva5[i];
 					}
 				}
 			}).then(function(result){
 				var indexDate = 0;
 				//Get the results depending the date filter
 				for(var i=0; i < $scope.partType.tolva5.length; i++){
 					currentDate = moment().format("DD-MM-YYYY");
 					filterDate = parseDate($scope.partType.tolva5[i].fecha);
 					currentDate = moment(currentDate, "DD-MM-YYYY");
 					filterDate = moment(filterDate, "DD-MM-YYYY");
 					//Getting the difference date from now to date
 					differenceDate = currentDate.diff(filterDate, 'months');
 					if(differenceDate > valueDate){
 						$scope.datePart.tolva5[indexDate] = $scope.partType.tolva5[i];
 						indexDate++;
 					}
 				}
 				$scope.searchPage.totalList = [];
 				$scope.searchPage.totalRows += $scope.datePart.tolva5.length;
				$scope.searchPage.totalList = $scope.datePart.tolva5;
 			});
 		};

 		var getTolvaSix = function(){
 			var index = 0;
 			var dateFirst = null;
 			var dateSecond = null;
 			var momentFirst = null;
 			var momentSecond = null;

 			var currentDate = null;
 			var filterDate = null;
 			var differenceDate = null;

 			Evo.getTolva_SixDate().then(function(response){
 				$scope.dateArray.tolva6 = response.results;
 				//Create the first insert
 				$scope.partType.tolva6[index] = $scope.dateArray.tolva6[0];
 				for(var i=0; i < $scope.dateArray.tolva6.length; i++ ){
 					if($scope.partType.tolva6[index].loconum == $scope.dateArray.tolva6[i].loconum){
 						//Parse date in format dd/mm/yy
 						dateFirst = parseDate($scope.partType.tolva6[index].fecha);
 						dateSecond = parseDate($scope.dateArray.tolva6[i].fecha);
 						momentFirst = moment(dateFirst, "DD-MM-YYYY");
 						momentSecond = moment(dateSecond, "DD-MM-YYYY");
 						if(momentFirst.isAfter(momentSecond)){
 							$scope.partType.tolva6[index] = $scope.partType.tolva6[index]
 						}else{
 							$scope.partType.tolva6[index] = $scope.dateArray.tolva6[i]
 						}
 					}else{
 						index++;
 						$scope.partType.tolva6[index] = $scope.dateArray.tolva6[i];
 					}
 				}
 			}).then(function(result){
 				var indexDate = 0;
 				//Get the results depending the date filter
 				for(var i=0; i < $scope.partType.tolva6.length; i++){
 					currentDate = moment().format("DD-MM-YYYY");
 					filterDate = parseDate($scope.partType.tolva6[i].fecha);
 					currentDate = moment(currentDate, "DD-MM-YYYY");
 					filterDate = moment(filterDate, "DD-MM-YYYY");
 					//Getting the difference date from now to date
 					differenceDate = currentDate.diff(filterDate, 'months');
 					if(differenceDate > valueDate){
 						$scope.datePart.tolva6[indexDate] = $scope.partType.tolva6[i];
 						indexDate++;
 					}
 				}
 				$scope.searchPage.totalList = [];
 				$scope.searchPage.totalRows += $scope.datePart.tolva6.length;
				$scope.searchPage.totalList = $scope.datePart.tolva6;
 			});
 		};

 		var getMD = function(){
 			var index = 0;
 			var dateFirst = null;
 			var dateSecond = null;
 			var momentFirst = null;
 			var momentSecond = null;

 			var currentDate = null;
 			var filterDate = null;
 			var differenceDate = null;

 			Evo.get_MDDate().then(function(response){
 				$scope.dateArray.md = response.results;
 				//Create the first insert
 				$scope.partType.md[index] = $scope.dateArray.md[0];
 				for(var i=0; i < $scope.dateArray.md.length; i++ ){
 					if($scope.partType.md[index].loconum == $scope.dateArray.md[i].loconum){
 						//Parse date in format dd/mm/yy
 						dateFirst = parseDate($scope.partType.md[index].fecha);
 						dateSecond = parseDate($scope.dateArray.md[i].fecha);
 						momentFirst = moment(dateFirst, "DD-MM-YYYY");
 						momentSecond = moment(dateSecond, "DD-MM-YYYY");
 						if(momentFirst.isAfter(momentSecond)){
 							$scope.partType.md[index] = $scope.partType.md[index]
 						}else{
 							$scope.partType.md[index] = $scope.dateArray.md[i]
 						}
 					}else{
 						index++;
 						$scope.partType.md[index] = $scope.dateArray.md[i];
 					}
 				}
 			}).then(function(result){
 				var indexDate = 0;
 				//Get the results depending the date filter
 				for(var i=0; i < $scope.partType.md.length; i++){
 					currentDate = moment().format("DD-MM-YYYY");
 					filterDate = parseDate($scope.partType.md[i].fecha);
 					currentDate = moment(currentDate, "DD-MM-YYYY");
 					filterDate = moment(filterDate, "DD-MM-YYYY");
 					//Getting the difference date from now to date
 					differenceDate = currentDate.diff(filterDate, 'months');
 					if(differenceDate > valueDate){
 						$scope.datePart.md[indexDate] = $scope.partType.md[i];
 						indexDate++;
 					}
 				}
 				$scope.searchPage.totalList = [];
 				$scope.searchPage.totalRows += $scope.datePart.md.length;
				$scope.searchPage.totalList = $scope.datePart.md;
 			});
 		};

 		var getComp = function(){
 			var index = 0;
 			var dateFirst = null;
 			var dateSecond = null;
 			var momentFirst = null;
 			var momentSecond = null;

 			var currentDate = null;
 			var filterDate = null;
 			var differenceDate = null;

 			Evo.get_COMPDate().then(function(response){
 				$scope.dateArray.comp = response.results;
 				//Create the first insert
 				$scope.partType.comp[index] = $scope.dateArray.comp[0];
 				for(var i=0; i < $scope.dateArray.comp.length; i++ ){
 					if($scope.partType.comp[index].loconum == $scope.dateArray.comp[i].loconum){
 						//Parse date in format dd/mm/yy
 						dateFirst = parseDate($scope.partType.comp[index].fecha);
 						dateSecond = parseDate($scope.dateArray.comp[i].fecha);
 						momentFirst = moment(dateFirst, "DD-MM-YYYY");
 						momentSecond = moment(dateSecond, "DD-MM-YYYY");
 						if(momentFirst.isAfter(momentSecond)){
 							$scope.partType.comp[index] = $scope.partType.comp[index]
 						}else{
 							$scope.partType.comp[index] = $scope.dateArray.comp[i]
 						}
 					}else{
 						index++;
 						$scope.partType.comp[index] = $scope.dateArray.comp[i];
 					}
 				}
 			}).then(function(result){
 				var indexDate = 0;
 				//Get the results depending the date filter
 				for(var i=0; i < $scope.partType.comp.length; i++){
 					currentDate = moment().format("DD-MM-YYYY");
 					filterDate = parseDate($scope.partType.comp[i].fecha);
 					currentDate = moment(currentDate, "DD-MM-YYYY");
 					filterDate = moment(filterDate, "DD-MM-YYYY");
 					//Getting the difference date from now to date
 					differenceDate = currentDate.diff(filterDate, 'months');
 					if(differenceDate > valueDate){
 						$scope.datePart.comp[indexDate] = $scope.partType.comp[i];
 						indexDate++;
 					}
 				}
 				$scope.searchPage.totalList = [];
 				$scope.searchPage.totalRows += $scope.datePart.comp.length;
				$scope.searchPage.totalList = $scope.datePart.comp;
 			});
 		};

 		//init routines
 		getTotalEvo();
 		$scope.$on('totalrows', function(e, totalRows){
 			console.log(totalRows);
 		});

 }]);
