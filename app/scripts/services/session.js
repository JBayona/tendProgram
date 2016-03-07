    'use strict';

/**
 * @ngdoc service
 * @name tendProgramApp.Session
 * @description
 * # Session
 * Service in the tendProgramApp.
 */
angular.module('tendProgramApp')
  .service('Session', ['$location', 'localStorageService', 'Proxy', '$rootScope', function ($location, localStorageService, Proxy, $rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.setSession = function(session){
    	if(session){
    		$rootScope.session = session;
    		localStorageService.set('trend-program-session', session);
    	}
    };

    this.setAttribute = function(attribute, value){
    	$rootScope.session[attribute] = value;
    };

    this.saveSession = function(){
    	localStorageService.set('trend-program-session', $rootScope.session);
    };

    this.getSession = function(){
    	var session = localStorageService.get('trend-program-session');
    	if(session){
    		$rootScope.session = session;
    	}
    	return session ? $rootScope.session : undefined;
    };

    this.hasSession = function(){
    	var session : this.getSession();
    	return session ? true : false;
    };

    this.logout = function(){
    	Proxy.postCall({},'https://api.parse.com/1/logout',{'X-Parse-Session-Token':$rootScope.session.sessionToken}).then(function(response){
    		localStorageService.remove('trend-program-session');
    		$rootScope.session = null;
    		$location.path('/login');
    	});
    };

    this.tokenValidate = function (){
    	return Proxy.getCall('https://api.parse.com/1/users/me',{},{'X-Parse-Session-Token':$rootScope.session.sessionToken});
    }

  }]);
