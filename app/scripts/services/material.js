'use strict';

/**
 * @ngdoc service
 * @name tendProgramApp.material
 * @description
 * # material
 * Service in the tendProgramApp.
 */
angular.module('tendProgramApp')
  .service('material', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
     return $.material;
  });
