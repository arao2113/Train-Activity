// Initialize Firebase
var config = {
    apiKey: "AIzaSyCNbWE-sC3NW8j5SHA2odl4_p1MTp5zOQA",
    authDomain: "train-activity-4d1cc.firebaseapp.com",
    databaseURL: "https://train-activity-4d1cc.firebaseio.com",
    projectId: "train-activity-4d1cc",
    storageBucket: "train-activity-4d1cc.appspot.com",
    messagingSenderId: "272897010511"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

// Click funtion for adding train
$("#add-train").on("click", function(event) {
    event.preventDefault();


    //Grab user input
    var tName = $("#train-name").val().trim();
    var destination = $("#destination-input").val().trim();
    var time = moment($("#time-input").val().trim(), "LT").format("X");
    var frequency = $("#frequency-input").val().trim();

    //Create local object to temp hold data
    var newTrain = {
        name: tName,
        destination: destination,
        time: time,
        frequency: frequency
    };

    //Upload train data to firebase
    database.ref().push(newTrain);

    //Logs data to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);


    // Time Conversions
    var timeCont = moment(time, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(timeCont), "minutes");
    var tRemainder = diffTime % frequency;
    var minutesTrain = frequency - tRemainder;
    var nextTrain = moment().add(minutesTrain, "minutes");
    var nextTrainCon = moment(nextTrain).format("hh:mm a");
    

    //Clear all boxes
    $("#train-name").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

    var newRow = $("<tr>").append(
        $("<td>").text(tName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrainCon),
        $("<td>").text(minutesTrain)
    );

    //Append to table
    $("#train-table > tbody").append(newRow);
})

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    //Store into variables
    var tname = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    var nextTrainCon = childSnapshot.val();
    var minutesTrain = childSnapshot.val();

    //Train Info
    console.log(tname);
    console.log(destination);
    console.log(frequency);
    console.log(conTime);
})