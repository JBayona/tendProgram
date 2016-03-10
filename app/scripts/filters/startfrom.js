'use strict';

/**
 * @ngdoc filter
 * @name tendProgramApp.filter:startFrom
 * @function
 * @description
 * # startFrom
 * Filter in the tendProgramApp.
 */
angular.module('tendProgramApp')
  .filter('startFrom', function () {
    return function (input,start) {
    	if(!input){
    		return;
    	}
      start = +start;
      return input.slice(start);
    };
  });
