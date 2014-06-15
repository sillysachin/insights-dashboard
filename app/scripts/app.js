'use strict';

/**
 * @ngdoc overview
 * @name inMemInfoDashApp
 * @description
 * # inMemInfoDashApp
 *
 * Main module of the application.
 */
var app = angular
  .module('inMemInfoDashApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.multiselect'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

app.controller('DashboardCtrl', function($scope) {
  $scope.name = 'World';
    $scope.cars = [{id:1, name: 'Audi'}, {id:2, name: 'BMW'}, {id:1, name: 'Honda'}];
    $scope.selectedCar = [];

    $scope.fruits = [{id: 1, name: 'Apple'}, {id: 2, name: 'Orange'},{id: 3, name: 'Banana'}];
    $scope.selectedFruit = null;
});
