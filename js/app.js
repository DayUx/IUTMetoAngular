var app = angular.module('myApp',["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "partials/meteovilles.html"
        })
        .when("/ville", {
            templateUrl : "partials/villes.html"
        })
        .when("/previsions", {
            templateUrl : "partials/previsions.html"
        })
        .when("/meteovilles", {
            templateUrl : "partials/meteovilles.html"
        });
});