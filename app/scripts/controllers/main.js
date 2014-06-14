'use strict';

/**
 * @ngdoc function
 * @name inMemInfoDashApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inMemInfoDashApp
 */
angular.module('inMemInfoDashApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
