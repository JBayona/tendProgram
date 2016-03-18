'use strict';

/**
 * @ngdoc service
 * @name tendProgramApp.evo
 * @description
 * # evo
 * Service in the tendProgramApp.
 */
angular.module('tendProgramApp')
  .service('Evo', ['Proxy', function (Proxy) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    	var getEvoInfo = function(){
    		//return Proxy.getCall('https://api.parse.com/1/classes/evo_fleet?limit=3&order=-createdAt&skip='+start+'&limit='+end+,{});
            return Proxy.getCall('https://api.parse.com/1/classes/evo_fleet?&order=-createdAt&skip=0&limit=10',{});
    	};

        var getEvoInfoTotal = function(start,end){
            return Proxy.getCall('https://api.parse.com/1/classes/evo_fleet?&order=-createdAt&skip='+start+'&limit='+end,{});
        };


        var getEvoFilterData = function(start,end,query){
             return Proxy.getCall('https://api.parse.com/1/classes/evo_fleet?&limit=1000&where={'+query+'}',{});
        };

        var getTolva_OneDate = function(){
             return Proxy.getCall('https://api.parse.com/1/classes/evo_fleet?&limit=1000&order=-loconum&where={"parte":"TOLVA1"}',{});
        };

    	return{
    		getEvoInfo: getEvoInfo,
            getEvoInfoTotal: getEvoInfoTotal,
            getEvoFilterData: getEvoFilterData,
            getTolva_OneDate : getTolva_OneDate
    	}
  }]);
