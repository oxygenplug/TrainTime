
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

  function TrainSchedule(name, firstArrival, dest, frequency) {
    this.name = name;
    this.nextArrival = moment(firstArrival);
    this.dest = dest;
    this.frequency = frequency;

    this.getNextArrival = function () {
      while (moment().isAfter(this.nextArrival)) {
        this.nextArrival.add(this.frequency, 'm')
      }
      return this.nextArrival;
      console.log(this.nextArrival)
    }

    this.getMinutesRemaining = function () {
      return moment(this.nextArrival).subtract(moment());
      console.log(moment(this.nextArrival).subtract(moment()));
    }
  }

  TrainSchedule(trainName, firstArrival, dest, frequency);

  // creates object to hold all the data
  var newTrainTime = {
    name: trainName,
    dest: dest,
    arrives: firstArrival,
    frequency: frequency,
  };

  // Uploads data to databse
  database.ref().push(newTrainTime);

  alert("A New Train Schedule Has Been Added!");







  // this is all commented out as I am trying out using a trainschedule constructor that includes a simpler function

  /*function calculateArrival() {
   // var aT = $("#arrivalTime").val().trim();
    // creates a new date object
    var currentTime= moment().format("HH:mm");
    console.log(currentTime);
    var timeE1 = $("#myTime").val();
    var timeE2 = moment(timeE1);
    var selectedArrivalTime = timeE2._i;
    console.log(timeE2._i);
    if (moment(selectedArrivalTime).isAfter(currentTime)) {
      console.log("I'm working!");
    };
   
  }

  calculateArrival();*/


  // commented out as I am dynamically writing the html with info pulled from the database
  // displays the data inputted by the user
  /*
  $("#trainDisplayData").append("<tr>" +
    "<th>" + trainName + "</th>" +
    "<th>" + dest + "</th>" +
    "<th>" + frequency + "</th>" +
    "<th>" + firstArrivalPOST + "</th>" +
    "<th>" + TrainSchedule.getMinutesRemaining + "</th>"
    + "</tr>")
*/


  // Clears all of the text-boxes
  $("#trainName").val("");
  $("#destination").val("");
  $("#myTime").val("");
  $("#frequency").val("");
});

// adds user input to train database
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var dest = childSnapshot.val().dest;
  var firstArrival = childSnapshot.val().arrives;
  var frequency = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(dest);
  console.log(firstArrival);
  console.log(frequency);

// not fully working, it reloads all childs each time. I need it to just reload them each one time
  database.ref().on('child_added', function(childSnapshot) {
   // $("#trainDisplayData").empty();
    $("#trainDisplayData").append("<tr>" +
    "<th>" + childSnapshot.val().name + "</th>" +
    "<th>" + childSnapshot.val().dest + "</th>" +
    "<th>" + childSnapshot.val().frequency + "</th>" +
    "<th>" +  + "</th>" +
    "<th>" +  + "</th>"
    + "</tr>")
})

});