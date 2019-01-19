// var mymap = L.map('mapid').setView([51.505, -0.09], 13);
// L.tileLayer(' https://master.apis.dev.openstreetmap.org', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox.streets',
//     accessToken: 'your.mapbox.access.token'
// }).addTo(mymap);

var map = new MapmyIndia.Map("map", { center: [28.61, 77.23], zoomControl: true, hybrid: true });
L.marker([28.61, 77.23]).addTo(map);
