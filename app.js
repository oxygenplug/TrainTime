
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

// 2. Button for adding Employees
$("#submitBtn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#trainName").val().trim();
  var dest = $("#destination").val().trim();
  var firstArrival = $("#arrivalTime").val().trim();
  var frequency = $("#frequency").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrainTime = {
    name: trainName,
    dest: dest,
    arrives: firstArrival,
    frequency: frequency,
  };

  // Uploads employee data to the database
  database.ref().push(newTrainTime);

  // Logs everything to console
  console.log(newTrainTime.name);
  console.log(newTrainTime.dest);
  console.log(newTrainTime.arrives);
  console.log(newTrainTime.frequency);

  // Alert
  alert("A New Train Schedule Has Been Added!");

  // Clears all of the text-boxes
  $("#trainName").val("");
  $("#destination").val("");
  $("#arrivalTime").val("");
  $("#frequency").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

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

});