let jourSemaine = {0: "Dimanche", 1: "Lundi", 2: "Mardi", 3: "Mercredi", 4: "Jeudi", 5: "Vendredi", 6: "Samedi"};
let latLong = {};

let DATA = {};

let appid = "439d4b804bc8187953eb36d2a8c26a02";

let appid2 = "91ff69b5d8840063d7bd0abbcf2cd86c";



//
// function createElem(obj, idx, tab) {
//     newDiv = $("<div></div>").addClass("meteo-journee").attr("id", idx);
//     ventDir = $("<h1></h1>").html(getCardinalDirection(obj.deg));
//     ventSpeed = $("<h1></h1>").html(obj.speed + " m/s");
//     vent = $("<div></div>").addClass("vent").append(ventDir).append(ventSpeed);
//     humiditeIcon = $("<img>").attr("src", "../images/water.svg");
//     humiditeVal = $("<h2></h2>").html(obj.humidity + " %");
//     humidite = $("<div></div>").addClass("humidite").append(humiditeIcon).append(humiditeVal);
//     tempMax = $("<h1></h1>").addClass("tempmax").html(Math.round(obj.temp.max) + "°C");
//     tempMin = $("<h1></h1>").addClass("tempmin").html(Math.round(obj.temp.min) + "°C");
//     temp = $("<div></div>").addClass("temp").append(tempMax).append(tempMin);
//     icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + obj.weather[0].icon + "@4x.png");
//     date = $("<h1></h1>").addClass("date").html(jourSemaine[new Date(obj.dt * 1000).getDay()] + " " + new Date(obj.dt * 1000).getDate());
//     delimiter = $("<div></div>").addClass("delimiter");
//     temps = $("<div></div>").attr("id", "temps").append(icon).append(temp);
//
//     leve = $("<div></div>").addClass("leve");
//     couche = $("<div></div>").addClass("couche");
//
//     coucheLever = $("<div></div>").addClass("couche-leve").append(leve).append(couche);
//
//     let styleElement = $("<style></style>");
//     styleElement.html(".leve::before{content: \"Lever \\00000a " + new Date(obj.sunrise * 1000).getUTCHours() + "h" + new Date(obj.sunrise * 1000).getUTCMinutes() + "\" !important;}.couche::before{content: \"Coucher \\00000a" + new Date(obj.sunset * 1000).getUTCHours() + "h" + new Date(obj.sunrise * 1000).getUTCMinutes() + "\" !important;}");
//
//
//     divextendcontent = $("<div></div>").addClass("meteo-journee-extend-content").append(vent).append(delimiter).append(humidite);
//     description = $("<p></p>").html(obj.weather[0].description);
//     divextend = $("<div></div>").addClass("meteo-journee-extend").append(divextendcontent).append(coucheLever).append(description);
//     div = $("<div></div>").addClass("meteo-journee-content").append(date).append(temps);
//     newDiv.append(div).append(divextend).click(function (param) {
//         $(".meteo-journee").removeClass("extend");
//         console.log(param.currentTarget);
//         param.currentTarget.classList.add("extend");
//         loadInfo(obj);
//     });
//     $("#search-result-meteo").append(newDiv);
//     if (idx == 0) {
//         newDiv.addClass("extend");
//         loadInfo(obj);
//     }
// }
//
//
// function loadInfo(data) {
//     obj = data;
//     $("#search-result-info").children().not(':first-child').remove();
//     delimiter = $("<div class='delimiter'></div>");
//     delimiter2 = $("<div class='delimiter'></div>");
//     leve = $("<div class='leve'></div>");
//     couche = $("<div class='couche'></div>");
//     coucheLever = $("<div class='couche-leve'></div>").append(leve).append(couche);
//     description = $("<p></p>").text(obj.weather[0].description);
//     tempMax = $("<h1></h1>").text(Math.round(obj.temp.max) + "°C").addClass("tempmax");
//     tempMin = $("<h1></h1>").text(Math.round(obj.temp.min) + "°C").addClass("tempmin");
//     temp = $("<div class='temp'></div>").append(tempMax).append(tempMin);
//     icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + obj.weather[0].icon + "@4x.png");
//     temps = $("<div class='temps'></div>").append(icon).append(temp).attr("id", "temps");
//     date = $("<p></p>").text(new Date(obj.dt * 1000).toLocaleDateString());
//     ventSpeed = $("<h2></h2>").text(obj.speed + " m/s");
//     ventDir = $("<h1></h1>").text(getCardinalDirection(obj.deg));
//     humiditeVal = $("<h2></h2>").text(obj.humidity + " %");
//     humiditeIcon = $("<img>").attr("src", "../images/water.svg");
//     humidite = $("<div class='humidite'></div>").append(humiditeIcon).append(humiditeVal);
//     vent = $("<div class='vent'></div>").append(ventDir).append(ventSpeed);
//     newDiv = $("<div class='result'></div>").append(temps).addClass("search-result-info-content").append(delimiter).append(humidite).append(delimiter2).append(vent);
//     $("#search-result-info").append(newDiv);
//     $("#search-result-info").append(coucheLever);
//     $("#search-result-info").append(description);
//     let styleElement = $("<style></style>");
//     styleElement.html(".leve::before{content: \"Lever \\00000a " + new Date(obj.sunrise * 1000).getUTCHours() + "h" + new Date(obj.sunrise * 1000).getUTCMinutes() + "\" !important;}.couche::before{content: \"Coucher \\00000a" + new Date(obj.sunset * 1000).getUTCHours() + "h" + new Date(obj.sunrise * 1000).getUTCMinutes() + "\" !important;}");
//     $("#search-result-info").append(styleElement);
// }
//
// function getCardinalDirection(angle) {
//     const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
//     return directions[Math.round(angle / 45) % 8];
// }
//
//
// function search(search) {
//     console.log(search);
//     $("#search-result-info").children().not(':first-child').remove();
//     $("#search-result-info").addClass("loading");
//     $.ajax({
//         url: "http://api.openweathermap.org/data/2.5/onecall?lat=" + search.lat + "&lon=" + search.lon + "&exclude=hourly,minutely&appid=" + appid2,
//         type: "GET",
//         dataType: "json",
//         success: function (data) {
//             if (data.city !== undefined) {
//                 DATA = data;
//                 $("#ville").html(data.city.name);
//                 $("#pays").attr("src", "https://countryflagsapi.com/png/" + data.city.country);
//                 $("#search-result-meteo").html("");
//                 $("#search-result-info").removeClass("loading");
//                 for (let i = 0; i < data.daily.length; i++) {
//                     createElem(data.daily[i], i, data.daily);
//                 }
//             }
//         },
//         error: function (xhr, status, error) {
//             console.log(error);
//         }
//     });
// }
//
//
// $("body").click(function () {
//     $("#search-list").removeClass("toggle");
// });
//
//
// function load() {
//     $("#search-list").children().not(':first-child').remove();
//     $("#search-list").addClass("loading");
//     let search = $("#search").val();
//     $.ajax({
//         url: "https://openweathermap.org/data/2.5/find?q=" + search + "&appid="+appid+"&units=metric",
//         type: "GET",
//         dataType: "json",
//         success: function (data) {
//             console.log(data);
//             $("#search-list").children().not(':first-child').remove();
//             $("#search-list").addClass("loading");
//             for (let i = 0; i < data.list.length; i++) {
//                 createSearchList(data.list[i], i, data.list);
//             }
//             $("#search-list").removeClass("loading");
//             $("#search-list").addClass("toggle");
//         },
//         error: function (xhr, status, error) {
//             console.log(error);
//             $("#search-list").removeClass("loading");
//         }
//     });
// }
//
//
// function createSearchList(obj, idx, tab) {
//     titre = $("<h3>").html(obj.name);
//     img = $("<img>").attr("src", "https://countryflagsapi.com/png/" + obj.sys.country);
//     tempMax = $("<h1></h1>").addClass("tempmax").html(Math.round(obj.main.temp_max + -273, 15) + "°C");
//     tempMin = $("<h1></h1>").addClass("tempmin").html(Math.round(obj.main.temp_min + -273, 15) + "°C");
//     icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + obj.weather[0].icon + "@4x.png");
//     temp = $("<div></div>").addClass("temp").append(tempMax).append(tempMin);
//     temps = $("<div></div>").attr("id", "temps").append(icon).append(temp);
//     span = $("<span></span>").append(titre).append(img).append(temps).click(function () {
//         $("#search-list").removeClass("toggle");
//         search(obj.coord);
//     });
//     $("#search-list").append(span);
// }
//
//
// function position(position) {
//     $.ajax({
//         url: "https://api.openweathermap.org/data/2.5/onecall?lat=35&exclude=hourly,minutely&lon=139&appid=" + appid2,
//         type: "GET",
//         dataType: "json",
//         success: function (data) {
//             if (data.city.name == "") {
//                 $("#ville").html("Ville inconnue");
//             } else {
//                 $("#ville").html(data.city.name);
//             }
//             if (data.city.country == "") {
//                 $("#pays").attr("src", "img/nodata.svg");
//             } else {
//                 $("#pays").attr("src", "https://countryflagsapi.com/png/" + data.city.country);
//             }
//             $("#search-result-meteo").html("");
//
//             for (let i = 0; i < data.list.length; i++) {
//                 createElem(data.list[i], i, data.list);
//             }
//         },
//         error: function (xhr, status, error) {
//         }
//     });
// }
//
//
// $("#search").keypress(function (e) {
//     if (e.keyCode == 13) {
//         load();
//     }
// });
//
//
// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(position);
// } else {
//     position({coords: {latitude: 48.856614, longitude: 2.3522219}});
// }
//
//
function initMap() {
    const myLatlng = {lat: 48.856614, lng: 2.3522219};
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: myLatlng,
    });
    google.maps.event.addListener(map, 'click', function (event) {
        marker.setPosition(event.latLng);
        latLong = event.latLng.toJSON();
    });
    let marker = new google.maps.Marker({
        position: location,
        map: map
    });

}
//
// function valider() {
//     $(".map-container").removeClass("toggle");
//     position({coords: {latitude: latLong.lat, longitude: latLong.lng}});
// }
//
function showMap() {
    $(".map-container").toggleClass("toggle");
}