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
             return Proxy.getCall('https://api.parse.com/1/classes/evo_fleet?&limit=1000&where={"parte":"TOLVA1"}',{});
        };

        var getTolva_TwoDate = function(){
             return Proxy.getCall('https://api.parse.com/1/classes/evo_fleet?&limit=1000&where={"parte":"TOLVA2"}',{});
        };

        var getTolva_ThreeDate = function(){
             return Proxy.getCall('https://api.parse.com/1/classes/evo_fleet?&limit=1000&where={"parte":"TOLVA3"}',{});
        };

        var getTolva_FourDate = function(){
             return Proxy.getCall('https://api.parse.com/1/classes/evo_fleet?&limit=1000&where={"parte":"TOLVA4"}',{});
        };

        var getTolva_FiveDate = function(){
             return Proxy.getCall('https://api.parse.com/1/classes/evo_fleet?&limit=1000&where={"parte":"TOLVA5"}',{});
        };

        var getTolva_SixDate = function(){
             return Proxy.getCall('https://api.parse.com/1/classes/evo_fleet?&limit=1000&where={"parte":"TOLVA6"}',{});
        };

        var get_MDDate = function(){
             return Proxy.getCall('https://api.parse.com/1/classes/evo_fleet?&limit=1000&where={"parte":"MD"}',{});
        };

        var get_COMPDate = function(){
             return Proxy.getCall('https://api.parse.com/1/classes/evo_fleet?&limit=1000&where={"parte":"COMP"}',{});
        };

    	return{
    		getEvoInfo: getEvoInfo,
            getEvoInfoTotal: getEvoInfoTotal,
            getEvoFilterData: getEvoFilterData,
            getTolva_OneDate : getTolva_OneDate,
            getTolva_TwoDate: getTolva_TwoDate,
            getTolva_ThreeDate: getTolva_ThreeDate,
            getTolva_FourDate: getTolva_FourDate,
            getTolva_FiveDate: getTolva_FiveDate,
            getTolva_SixDate: getTolva_SixDate,
            get_MDDate: get_MDDate,
            get_COMPDate: get_COMPDate
    	}
  }]);
