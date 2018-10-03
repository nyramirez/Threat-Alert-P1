// Initialize Firebase
var config = {
    apiKey: "AIzaSyBSVPTQBNPl3m1xaE1X6nFbAV8TM04Een8",
    authDomain: "testdataflag.firebaseapp.com",
    databaseURL: "https://testdataflag.firebaseio.com",
    projectId: "testdataflag",
    storageBucket: "",
    messagingSenderId: "37097842834"
};
firebase.initializeApp(config);
const database = firebase.database();

function checkUser() {
    console.log("check user");
    var username = $("#username").val().trim();
    var exists=false;
    console.log("userName:" +username);
    console.log("I was here");
     database.once('value', function (snapshot) {
        exists = snapshot.child("username").exists();
        var lastlogin = snapshot.child("lastLogin").val();
        userExistsCallback(username, exists, lastlogin);
    });
    userExistsCallback(username, exists, lastlogin); 
}

function userExistsCallback(username, exists, lastlogin) {
    console.log("am I comming here");
    var randomDate = moment();
    var randomFormat = "MM/DD/YYYY";
    var convertedDate = moment(randomDate, randomFormat);
    var newLogin = moment(convertedDate).format("MMM Do, YYYY hh:mm:ss");
    var lastlogin = moment(lastlogin).isAfter(moment(newLogin));
    if (exists && !lastlogin) {
        console.log("I exist");
        const userData = {
            "name": username,
            "password": $("#password").val().trim(),
            "lastLogin": newLogin,
            "visited": "1"
        };
        database.ref().child(username).update(userData);
        console.log("Updated Data.");

    } else {
        console.log("I do not exist");
        const userData = {
            "name": username,
            "password": $("#password").val().trim(),
            "lastLogin": newLogin,
            "visited": "0"
        };

        database.ref().set(userData);
        console.log("New Data.");
        // Reset
        $("input").val("");
    }
}

$(document).ready(function () {
    $("#login").on("click", checkUser);
    console.log("I am here toooo");
});

