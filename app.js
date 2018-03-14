
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
$("#submitBtn").on("click", function (event) {
    event.preventDefault();

  // Grabs user input
    var trainName = $("#trainName").val().trim();
    var dest = $("#destination").val().trim();
    var firstArrival = $("#arrivalTime").val().trim();
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
    //sets aT to the arrival time input which is in military time format
    var aT = $("#arrivalTime").val().trim();
    // grabs the first two digits of the submitted time
    var slicedH = Number(aT.slice(0, 2));
    var slicedM = Number(aT.slice(3,5));
    var slicedaT = Number(slicedH) + ":" + Number(slicedM);
    // creates a new date object
    console.log(slicedaT);
    var currentH = moment().hour();
    var currentM = moment().minutes();
    var currentTime = Number(currentH) + ":" + Number(currentM);
    console.log(currentTime);

    var frequency = Number($("#frequency").val().trim());
    var nextArrival;
    while(slicedH < currentH && slicedM < currentM) {
      nextArrival = moment().hour().minutes();
      nextArrival.add(frequency, minutes)
    }

    console.log(nextArrival);

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
  $("#arrivalTime").val("");
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