// Initialize Firebase, change credentials in regards to your project
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

// Variables to store coordinates of place when clicked on the Map.
var latitude = 0.0;
var longitude = 0.0;

// Variable to store authentication state of user
var isSignedIn = false;
var uid = '';

// Initialize and add the map
function initMap() {

    // The location of Uluru - Default Marker Position
    var uluru = { lat: 30.3983, lng: 78.0751 };
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 17, center: uluru, mapTypeId: 'hybrid', gestureHandling: 'cooperative', minZoom: 16, panControl: false  });
        map.setTilt(45)
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({ position: uluru, map: map, title: "DIT UNIVERSITY" });
    
    // Whenever someone clicks on the Map, show a Modal for collecting additional information in regards to
    // the particular coordinate
    google.maps.event.addListener(map, 'click', function (event) {
        var position = event.latLng;
        latitude = position.lat();
        longitude = position.lng();
        showModal();
    });

    loadData(map); //Load saved Markers from database
}

function loadData(map) {
    signInAnonymously(); // Sign-in user Anonymously, essential for reading data from database

    // Fetch data from database
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var isAnonymous = user.isAnonymous;
            uid = user.uid;
            isSignedIn = true;
            console.info("Sucess! You have logged-in successfully.")

            var storedItems = firebase.database().ref('users');
            storedItems.on('child_added', function (snapshot) {
                snapshot.forEach(element => {
                    setMarker(element.child("name").val(),
                        element.child("description").val(),
                        element.child("lat").val(),
                        element.child("lng").val(), map);
                });
            });
            // ...
        } else {
            // User is signed out.
            // [TODO]
            // ...
        }
        // ...
    });
}

// Handles sign-in of users anonymously
function signInAnonymously() {
    firebase.auth().signInAnonymously().catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        //set contents for error modal to be shown
        document.getElementById('message-modal-title').innerText = "Application Error" 
        document.getElementById('message-modal-body').innerText = "Error " + errorCode + ": " + errorMessage
        $('#messageModal').modal('show'); // show error Modal
    });
}

// Draws a marker on the map based on parameter data
//Variables Meaning:  a - Item Name, b - Item Description, c - Latitude, d - Longitude
function setMarker(a, b, c, d, map) {
    var point = { lat: parseFloat(c), lng: parseFloat(d) }
    var details = "Name: " + a + ", Description: " + b;
    var marker = new google.maps.Marker({ position: point, map: map, title: details });
}


// Show a Modal to collect information about the item.
function showModal() {
    $('#myModal').modal('show')
    document.getElementById('itemCoordintes').innerText = latitude + ", " + longitude; //passing latitude and longitude value into the Modal
}


// Save Item information to database
function saveDataToFirebase() {
    if (isSignedIn) { //Check if user is signed-in
        var itemName = document.getElementById('itemName').value;
        var itemDescription = document.getElementById('itemDescription').value;
        // pushing items with unique key
        database.ref('users/' + uid + "/").push().set({
            name: itemName,
            description: itemDescription,
            lat: latitude,
            lng: longitude
        });
        $('#myModal').modal('hide'); //after data is saved close the modal
       initMap(); //refresh map with new markers added.
    }
    else {
        // Prepare Error Message
        document.getElementById('message-modal-title').innerText = "Unable to save data!"
        document.getElementById('message-modal-body').innerText = "Error: Check your Internet Connection, or try reloading."
        $('#messageModal').modal('show'); //show error message modal
    }
}