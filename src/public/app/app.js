'use strict';

var app = angular.module('home-os', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
    .when('/command', {
        templateUrl: '/app/controllers/command/command.html',
        controller: 'CommandCtrl'
    })
    .when('/logs', {
        templateUrl: '/app/controllers/logs/logs.html',
        controller: 'LogsCtrl'
    })
    .otherwise({
        redirectTo: '/command'
    });
});
