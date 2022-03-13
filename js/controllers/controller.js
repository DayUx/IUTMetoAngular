var routeAppController = angular.module('routeAppController', []);


var villes = JSON.parse("{}")


if (localStorage.getItem('villesFavorites') == null && localStorage.getItem('villesFavorites') == undefined) {
    localStorage.setItem('villesFavorites', {});
}

$(document).ready(function () {
    $('.sidenav').sidenav();
});

$(document).ready(function () {
    $('.collapsible').collapsible();
});


routeAppController.controller("ControllerMeteoVilles", function ($scope, $http) {

    $scope.getCardinalDirection = function (angle) {
        const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
        return directions[Math.round(angle / 45) % 8];
    }

    $(document).ready(function () {
        $('.tooltipped').tooltip();
    });
    $(document).ready(function () {
        $('.sidenav').sidenav();
    });


    $scope.removeFavoris = function (id) {
        var villeFavorites = JSON.parse(localStorage.getItem('villesFavorites'));
        villeFavorites[id] = undefined;
        localStorage.setItem('villesFavorites', JSON.stringify(villeFavorites));
        $scope.reloadFavoris();

    }

    $scope.appid = "439d4b804bc8187953eb36d2a8c26a02";
    $scope.appid2 = "91ff69b5d8840063d7bd0abbcf2cd86c";
    $scope.reloadFavoris = function () {
        if (localStorage.getItem('villesFavorites') != null && localStorage.getItem('villesFavorites') != undefined) {
            $scope.villesFavorites = JSON.parse(localStorage.getItem('villesFavorites'));
        }
    }

    $scope.reloadFavoris();


    $scope.search = function () {
        $http({
            method: 'GET',
            url: "https://openweathermap.org/data/2.5/find?q=" + $scope.searchInput + "&appid=" + $scope.appid + "&units=metric&lang=fr"
        }).then(function successCallback(response) {
            var villeFavorites = localStorage.getItem('villesFavorites');
            villeFavorites = JSON.parse(villeFavorites);


            for (i = 0; i < response.data.list.length; i++) {
                if (villeFavorites[response.data.list[i].id] != null && villeFavorites[response.data.list[i].id] != undefined) {
                    response.data.list[i].favoris = "fas fa-heart-broken";
                } else {
                    response.data.list[i].favoris = "fas fa-heart";
                }
            }

            villes = response.data.list;
            $scope.meteovilles = response.data.list;
        }, function errorCallback(response) {
            console.log(response);
        });
    }


    $scope.addFavorite = function (ville, id, $event) {
        var villeFavorites = localStorage.getItem('villesFavorites');
        villeFavorites = JSON.parse(villeFavorites);
        if (villeFavorites[id] == null && villeFavorites[id] == undefined) {

            let lat;
            let lon;
            let ville;
            for (i = 0; i < $scope.meteovilles.length; i++) {
                if ($scope.meteovilles[i].id == id) {
                    $scope.meteovilles[i].favoris = "fas fa-heart-broken";
                    ville = $scope.meteovilles[i]

                }
            }

            villeFavorites[id] = ville;
            localStorage.setItem('villesFavorites', JSON.stringify(villeFavorites));
            $event.currentTarget.innerHTML = "<i class='fas fa-heart-broken'></i>";
        } else {
            villeFavorites[id] = undefined;
            localStorage.setItem('villesFavorites', JSON.stringify(villeFavorites));
            $event.currentTarget.innerHTML = "<i class='fas fa-heart'></i>";
            for (i = 0; i < $scope.meteovilles.length; i++) {
                if ($scope.meteovilles[i].id == id) {
                    $scope.meteovilles[i].favoris = "fas fa-heart";
                }
            }
        }
        $scope.reloadFavoris();
        console.log(localStorage.getItem('villesFavorites'));
    }
});


routeAppController.controller("ControllerPrevisions", function ($scope, $routeParams, $http) {

    $scope.getCardinalDirection = function (angle) {
        const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
        return directions[Math.round(angle / 45) % 8];
    }

    if (localStorage.getItem('villesFavorites') != null && localStorage.getItem('villesFavorites') != undefined) {
        $scope.villesFavorites = JSON.parse(localStorage.getItem('villesFavorites'));
    }

    $scope.appid = "439d4b804bc8187953eb36d2a8c26a02";
    $scope.appid2 = "91ff69b5d8840063d7bd0abbcf2cd86c";

    for (var i = 0; i < villes.length; i++) {
        if (villes[i].id == $routeParams.id) {
            $scope.ville = villes[i];
        }
    }

    $(document).ready(function () {
        $('.sidenav').sidenav();
    });
    $(document).ready(function () {
        $('.collapsible').collapsible();
    });

    if (villes == undefined || villes.length == 0 || Object.keys(villes).length === 0 && villes.constructor === Object) {
        console.log("test");
        $scope.ville = JSON.parse(localStorage.getItem('villesFavorites'))[$routeParams.id];
    }
    console.log($scope.ville);

    $http({
        method: 'GET',
        url: "http://api.openweathermap.org/data/2.5/onecall?lat=" + $scope.ville.coord.lat + "&lon=" + $scope.ville.coord.lon + "&exclude=hourly,minutely&lang=fr&units=metric&appid=" + appid2
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

