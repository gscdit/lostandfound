// Initialize Firebase
var config = {
    apiKey: "AIzaSyDZREMCOBf3WMACWqPDMCJ9s65_Cr-GJzo",
    authDomain: "lost-and-found-123.firebaseapp.com",
    databaseURL: "https://lost-and-found-123.firebaseio.com",
    projectId: "lost-and-found-123",
    storageBucket: "lost-and-found-123.appspot.com",
    messagingSenderId: "762371031659"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

var latitude = 0.0;
var longitude = 0.0;

// Initialize and add the map
function initMap() {
    // The location of Uluru
    var uluru = { lat: 30.3983, lng: 78.0751 };
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 18, center: uluru });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({ position: uluru, map: map, title: "DIT UNIVERSITY" });
    google.maps.event.addListener(map, 'click', function (event) {
        var position = event.latLng;
        latitude = position.lat();
        longitude = position.lng();
        showModal();
        marker = new google.maps.Marker({ position: event.latLng, map: map });
    });
}

function showModal() {
    // console.log(position.lat() + " " + position.lng());
    $('#myModal').modal('show')
    document.getElementById('itemCoordintes').innerText = latitude + ", " + longitude;
}



function saveDataToFirebase() {
    console.log("jsdsdfhj")
    var itemName = document.getElementById('itemName').value;
    var itemDescription = document.getElementById('itemDescription').value;
    database.ref('users/').set({
        name: itemName,
        description: itemDescription,
        lat: latitude,
        lng: longitude
    });
}