var routeAppController = angular.module('routeAppController', []);


var villes = {}


routeAppController.controller("ControllerMeteoVilles", function ($scope, $http) {


    $scope.appid = "439d4b804bc8187953eb36d2a8c26a02";
    $scope.appid2 = "91ff69b5d8840063d7bd0abbcf2cd86c";


    $scope.search = function () {
        $http({
            method: 'GET',
            url: "https://openweathermap.org/data/2.5/find?q=" + $scope.searchInput + "&appid=" + $scope.appid + "&units=metric&lang=fr"
        }).then(function successCallback(response) {
            villes = response.data.list;

            $scope.meteovilles = response.data.list;
        }, function errorCallback(response) {
            console.log(response);
        });
    }
});


routeAppController.controller("ControllerPrevisions", function ($scope, $routeParams, $http) {
    $scope.appid = "439d4b804bc8187953eb36d2a8c26a02";
    $scope.appid2 = "91ff69b5d8840063d7bd0abbcf2cd86c";

    for (var i = 0; i < villes.length; i++) {
        if (villes[i].id == $routeParams.id) {
            $scope.ville = villes[i];
        }
    }
    console.log($scope.ville);
    $http({
        method: 'GET',
        url: "http://api.openweathermap.org/data/2.5/onecall?lat=" + $scope.ville.coord.lat + "&lon="+ $scope.ville.coord.lon + "&exclude=hourly,minutely&lang=fr&units=metric&appid=" + appid2
    }).then(function successCallback(response) {
        for (var i = 0; i < response.data.daily.length; i++) {
            response.data.daily[i].date = jourSemaine[new Date(response.data.daily[i].dt * 1000).getDay()] + " " + new Date(response.data.daily[i].dt * 1000).getDate();
        }
        $scope.previsions = response.data.daily;
        loadCollapsible();
    }, function errorCallback(response) {
        console.log(response);
    });



});

