'use strict';

/**
 * @ngdoc function
 * @name inMemInfoDashApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the inMemInfoDashApp
 */
angular.module('inMemInfoDashApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
