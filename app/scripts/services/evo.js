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

        this.getPlayerMatches = function(player1,player2){
            console.log(player1 +' vs '+player2);
            return Proxy.getCall('https://api.parse.com/1/classes/fifa_tournament_match?&order=-createdAt&where={"$or":[{"home":{"__type":"Pointer","className":"_User","objectId":"'+player1+'"},"away":{"__type":"Pointer","className":"_User","objectId":"'+player2+'"}},{"home":{"__type":"Pointer","className":"_User","objectId":"'+player2+'"},"away":{"__type":"Pointer","className":"_User","objectId":"'+player1+'"}}]}',{});
        };

    	return{
    		getEvoInfo: getEvoInfo,
            getEvoInfoTotal: getEvoInfoTotal,
            getEvoFilterData: getEvoFilterData
    	}
  }]);
