var app = angular.module('myApp', ["ngRoute",'routeAppController']);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "partials/meteovilles.html",
            controller:"ControllerMeteoVilles"
        })
        .when("/ville", {
            templateUrl: "partials/villes.html"
        })
        .when("/previsions", {
            templateUrl: "partials/previsions.html",
            controller:"ControllerPrevisions"

        })
        .when("/contact", {
            templateUrl: "partials/contact.html"
        })
        .when("/aide", {
            templateUrl: "partials/aide.html"
        });
});