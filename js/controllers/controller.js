
//creation du controller
var routeAppController = angular.module('routeAppController', []);


var villes = JSON.parse("{}")

//initilisation de la liste des villes favoris
if (localStorage.getItem('villesFavorites') == null && localStorage.getItem('villesFavorites') == undefined) {
    localStorage.setItem('villesFavorites', {});
}


//initialisations pour materialize

$(document).ready(function () {
    $('.sidenav').sidenav();
});

$(document).ready(function () {
    $('.collapsible').collapsible();
});


//controleur de la page d'accueil
routeAppController.controller("ControllerMeteoVilles", function ($scope, $http) {


    //indique la direction du vent a partir de l'angle
    $scope.getCardinalDirection = function (angle) {
        const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
        return directions[Math.round(angle / 45) % 8];
    }


    //initialisations pour materialize
    $(document).ready(function () {
        $('.tooltipped').tooltip();
    });
    $(document).ready(function () {
        $('.sidenav').sidenav();
    });


    //supprimme la villes de la liste des villes favorites avec son id
    $scope.removeFavoris = function (id) {
        var villeFavorites = JSON.parse(localStorage.getItem('villesFavorites'));
        villeFavorites[id] = undefined;
        localStorage.setItem('villesFavorites', JSON.stringify(villeFavorites));
        $scope.reloadFavoris();

    }

    //les differentes clefs api
    $scope.appid = "439d4b804bc8187953eb36d2a8c26a02";
    $scope.appid2 = "91ff69b5d8840063d7bd0abbcf2cd86c";


    //permet de reload les favoris
    $scope.reloadFavoris = function () {
        if (localStorage.getItem('villesFavorites') != null && localStorage.getItem('villesFavorites') != undefined && localStorage.getItem('villesFavorites') != "") {
            $scope.villesFavorites = JSON.parse(JSON.stringify(localStorage.getItem('villesFavorites')));
        }
    }

    $scope.reloadFavoris();//reload les villes favorites


    //realise la recherche de la ville
    $scope.search = function () {
        $http({
            method: 'GET',
            url: "https://openweathermap.org/data/2.5/find?q=" + $scope.searchInput + "&appid=" + $scope.appid + "&units=metric&lang=fr"
            //requete pour recuperer la liste des villes
        }).then(function successCallback(response) {
            var villeFavorites = localStorage.getItem('villesFavorites');//recupere les villes favorites
            villeFavorites = JSON.parse(JSON.stringify(villeFavorites));//converti le string en json


            for (i = 0; i < response.data.list.length; i++) {//parcours la liste des villes
                if (villeFavorites[response.data.list[i].id] != null && villeFavorites[response.data.list[i].id] != undefined) { //si la ville est dans les favoris
                    response.data.list[i].favoris = "fas fa-heart-broken"; //la ville ne peut pas etre ajoutee a la liste des favoris
                } else {
                    response.data.list[i].favoris = "fas fa-heart";//la ville peut etre ajoutee aux favoris
                }
            }

            villes = response.data.list;
            $scope.meteovilles = response.data.list; //recupere la liste des villes
        }, function errorCallback(response) {
            console.log(response); // affiche les erreurs
        });
    }


    //ajoute une ville a la liste des favoris avec son id
    $scope.addFavorite = function (ville, id, $event) {
        var villeFavorites = localStorage.getItem('villesFavorites');
        villeFavorites = JSON.parse(JSON.stringify(villeFavorites));
        if (villeFavorites[id] == null && villeFavorites[id] == undefined) {//si la ville n'est pas dans les favoris


            let ville;
            for (i = 0; i < $scope.meteovilles.length; i++) {
                if ($scope.meteovilles[i].id == id) {
                    $scope.meteovilles[i].favoris = "fas fa-heart-broken"; //modification du boutan favoris
                    ville = $scope.meteovilles[i]

                }
            }

            villeFavorites[id] = ville; //ajoute la ville a la liste des favoris
            localStorage.setItem('villesFavorites', JSON.stringify(villeFavorites));//enregistre la liste des favoris dans le stockage local
            $event.currentTarget.innerHTML = "<i class='fas fa-heart-broken'></i>";//modification du bouton favoris
        } else {//si la ville est dans les favoris
            villeFavorites[id] = undefined;//supprime la ville de la liste des favoris
            localStorage.setItem('villesFavorites', JSON.stringify(villeFavorites));//enregistre la liste des favoris dans le stockage local
            $event.currentTarget.innerHTML = "<i class='fas fa-heart'></i>";//modification du bouton favoris
            for (i = 0; i < $scope.meteovilles.length; i++) {//parcours la liste des villes
                if ($scope.meteovilles[i].id == id) {
                    $scope.meteovilles[i].favoris = "fas fa-heart";//modification du bouton favoris
                }
            }
        }
        $scope.reloadFavoris();//reload les villes favorites
    }
});


routeAppController.controller("ControllerPrevisions", function ($scope, $routeParams, $http) {

    //indique la direction du vent a partir de l'angle
    $scope.getCardinalDirection = function (angle) {
        const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
        return directions[Math.round(angle / 45) % 8];
    }


    if (localStorage.getItem('villesFavorites') != null && localStorage.getItem('villesFavorites') != undefined) {
        $scope.villesFavorites = JSON.parse(JSON.stringify(localStorage.getItem('villesFavorites')));//on recupere  la liste des villes favorites pour la rajouter dans le scope
    }

    //les clefs api de openweathermap
    $scope.appid = "439d4b804bc8187953eb36d2a8c26a02";
    $scope.appid2 = "91ff69b5d8840063d7bd0abbcf2cd86c";

    for (var i = 0; i < villes.length; i++) {
        if (villes[i].id == $routeParams.id) {
            $scope.ville = villes[i]; //recupere la ville a partir de l'id
        }
    }


    //initialisations materialize
    $(document).ready(function () {
        $('.sidenav').sidenav();
    });
    $(document).ready(function () {
        $('.collapsible').collapsible();
    });

    if (villes == undefined || villes.length == 0 || Object.keys(villes).length === 0 && villes.constructor === Object) { //si la liste des villes est vide
        $scope.ville = JSON.parse(JSON.stringify(localStorage.getItem('villesFavorites')))[$routeParams.id];//on recupere la ville a partir de l'id dans la liste des favoris
    }

    //recupere les previsions meteo sur 7 jours
    $http({
        method: 'GET',
        url: "http://api.openweathermap.org/data/2.5/onecall?lat=" + $scope.ville.coord.lat + "&lon=" + $scope.ville.coord.lon + "&exclude=hourly,minutely&lang=fr&units=metric&appid=" + $scope.appid2 //recupere les previsions meteo sur 7 jours
    }).then(function successCallback(response) {
        for (var i = 0; i < response.data.daily.length; i++) {
            response.data.daily[i].date = jourSemaine[new Date(response.data.daily[i].dt * 1000).getDay()] + " " + new Date(response.data.daily[i].dt * 1000).getDate(); //formatage de la date
        }
        $scope.previsions = response.data.daily;//recupere les previsions dans le scope

    }, function errorCallback(response) {
        console.log(response);//affiche les erreurs
    });


});

