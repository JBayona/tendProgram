'use strict';

/**
 * @ngdoc service
 * @name tendProgramApp.Proxy
 * @description
 * # Proxy
 * Service in the tendProgramApp.
 */
angular.module('tendProgramApp')
  .service('Proxy', [ '$q', '$http', function ($q, $http) {
    var restCall = function(method,data,url,params,headers,external){
  		var defer = $q.defer();
  		var reqHeaders = external ? {} : {
		    'X-Parse-Application-Id': 'AxcIKaTzkxUJhKn0BQqabnpxAB2qy4XWvt8upQ5X',
			'X-Parse-REST-API-Key': '2BDNBcWYRe6u6uA82VU5qfpDpsIJNjPD1agCne0k',
		    'Content-Type':'application/json'
		  };

  		if(headers){
		  	angular.forEach(headers,function(value,key){
		  		reqHeaders[key] = value;
		  	});
		  }
  		var req = {
		  method: method,
		  url: url,
		  headers: reqHeaders,
		  data:data,
		  params:params
		  };
	    $http(req).
		  success(function(data, status, headers, config) {
		    defer.resolve(data);
		 }).
		  error(function(data, status, headers, config) {
		  	defer.reject(data);
		 });
		 return defer.promise;
	  };
	  var getRestCall = function(data){
	  	return $http.get(url,{params:data});
	  }
		var postCall = function(data,url,headers){
			return restCall('POST',data,url,{},headers);
		};

		var putCall = function(data,url){
			return restCall('PUT',data,url);
		};

		var getCall = function(url,params,headers){
			params = params ? params:{};
			return restCall('GET',{},url,params,headers);
		};

		var getExternalCall = function(url,params,headers){
			params = params ? params:{};
			return restCall('GET',{},url,params,headers,true);
		};

		var deleteCall = function(data,url){
			return restCall('DELETE',data,url);
		};

		return{ //Purpose
			postCall:postCall,
			putCall:putCall,
			getCall:getCall,
			getExternalCall:getExternalCall,
			deleteCall:deleteCall
		}
    // AngularJS will instantiate a singleton by calling "new" on this function
  }]);
