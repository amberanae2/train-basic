var config = {
    apiKey: "AIzaSyDYXAc-cNeu_foKTq7xndmTNzz18cnjxWk",
    authDomain: "amber-ranae-first.firebaseapp.com",
    databaseURL: "https://amber-ranae-first.firebaseio.com",
    projectId: "amber-ranae-first",
    storageBucket: "amber-ranae-first.appspot.com",
    messagingSenderId: "189817195092"
  };
  firebase.initializeApp(config);


var trainData = firebase.database();


$("#addTrainBtn").on("click", function(){

	
	var trainName = $("#trainNameInput").val().trim();
	var destination = $("#destinationInput").val().trim();
	var firstTrainUnix = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
	var frequency = $("#frequencyInput").val().trim();

	
	var newTrain = {
		name:  trainName,
		destination: destination,
		firstTrain: firstTrainUnix,
		frequency: frequency
	}


	trainData.ref().push(newTrain);


	console.log(newTrain.name);
	console.log(newTrain.destination); 
	console.log(firstTrainUnix);
	console.log(newTrain.frequency)

	alert("Train successfully added");

	
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTrainInput").val("");
	$("#frequencyInput").val("");

	
	return false;
}); 


    trainData.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	
	var tName = childSnapshot.val().name;
	var tDestination = childSnapshot.val().destination;
	var tFrequency = childSnapshot.val().frequency;
	var tFirstTrain = childSnapshot.val().firstTrain;

	
	var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
	var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency ;
	var tMinutes = tFrequency - tRemainder;

	
	var tArrival = moment().add(tMinutes, "m").format("hh:mm A"); 
	console.log(tMinutes);
	console.log(tArrival);

	console.log(moment().format("hh:mm A"));
	console.log(tArrival);
	console.log(moment().format("X"));

	
	$("#trainTable > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");

});

    var tFrequency = 8;

    
    var firstTime = "8:30";

    
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

   
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

   
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

 
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

