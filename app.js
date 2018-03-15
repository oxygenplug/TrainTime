
var config = {
  apiKey: "AIzaSyAiVvzFKaP24b7Jsw1mAxp0Gw75kF7nduI",
  authDomain: "traintime-47b98.firebaseapp.com",
  databaseURL: "https://traintime-47b98.firebaseio.com",
  projectId: "traintime-47b98",
  storageBucket: "",
  messagingSenderId: "347695350504"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
$("#submitBtn").on("click", function (event) {
    event.preventDefault();

  // Grabs user input
    var trainName = $("#trainName").val().trim();
    var dest = $("#destination").val().trim();
    var firstArrival = $("#myTime").val().trim();
    var frequency = $("#frequency").val().trim();

  // creates object to hold all the data
  var newTrainTime = {
    name: trainName,
    dest: dest,
    arrives: firstArrival,
    frequency: frequency,
  };

  // Uploads data to databse
  database.ref().push(newTrainTime);

  // Logs everything to console
  console.log(newTrainTime.name);
  console.log(newTrainTime.dest);
  console.log(newTrainTime.arrives);
  console.log(newTrainTime.frequency);

  // Alert
  alert("A New Train Schedule Has Been Added!");

  function calculateArrival() {
   // var aT = $("#arrivalTime").val().trim();
    // creates a new date object
    var currentTime= moment().format("HH:mm a");
    console.log(currentTime);
    var timeE1 = $("#myTime").val();
    var timeE2 = moment(timeE1);
    console.log(timeE2);
    /*if (moment(timeE2).isAfter(currentTime)) {
    var calculatedArrivalTime = 5
    };*/
   
  }

  calculateArrival();
  // displays the data inputted by the user
  $("#trainDisplayData").append("<tr>" +
    "<th>" + trainName + "</th>" +
    "<th>" + dest + "</th>" +
    "<th>" + frequency + "</th>" +
    "<th>" + + "</th>" +
    "<th>" + + "</th>"
    + "</tr>")



  // Clears all of the text-boxes
  $("#trainName").val("");
  $("#destination").val("");
  $("#myTime").val("");
  $("#frequency").val("");
});

// adds user input to train database
database.ref("Trains").on("child_added", function (childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var dest = childSnapshot.val().dest;
  var firstArrival = childSnapshot.val().arrives;
  var frequency = childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(dest);
  console.log(firstArrival);
  console.log(frequency);

  /* I am still unsure how to pull the data back from firebase.
  The user input captured gets sent into a randomly named object,
  so im unsure how to properly reference that */

});