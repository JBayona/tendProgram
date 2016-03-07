'use strict';

/**
 * @ngdoc service
 * @name tendProgramApp.LoginService
 * @description
 * # LoginService
 * Service in the tendProgramApp.
 */
angular.module('login')
  .service('LoginService',['Proxy',function (Proxy) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    /*login calls*/
    var login = function(username, password){
    	var params = {
    		'username' : encodeURIComponent(username),
    		'password':  encodeURIComponent(password)
    	};
    	return Proxy.getCall('https://api.parse.com/1/login', params);
    };

    var reset = function(email){
    	var params = {
    		'email' : email
    	};
    	return Proxy.postCall(params,'https://api.parse.com/1/requestPasswordReset');
    };

    var getUsers = function(){
    	var params = {
    		'order':'first_name'
    	};
    	return Proxy.getCall('https://api.parse.com/1/users',params);
    };

    return{
    	login : login,
    	reset : reset,
    	getUsers : getUsers
    }

  }]);
