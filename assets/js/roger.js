// Initialize Firebase
var config = {
    apiKey: "AIzaSyCsDh3ra7faSCJycuwelMipu-6biTdqFMM",
    authDomain: "rgb-rps.firebaseapp.com",
    databaseURL: "https://rgb-rps.firebaseio.com",
    projectId: "rgb-rps",
    storageBucket: "rgb-rps.appspot.com",
    messagingSenderId: "277284413470"
};
firebase.initializeApp(config);
const firestore = firebase.firestore();

// the next two lines stop a firebase error message
const settings = {
    timestampsInSnapshots: true
};
firestore.settings(settings);

const empRef = firestore.collection('employees'); // after the settings call
var oThisRef = empRef.doc('Roger');
var sImageLink;

// test routine - just extracts an image and puts it on the screen

//showImage (1);

//function showImage(iEmployeeId) {
//    console.log ("Emp ID: " + iEmployeeId.toString().padStart(3, '0'));
//    var oThisRef = empRef.doc(iEmployeeId.toString().padStart(3, '0'));

    oThisRef.get({}).then(oDoc => {
        if (oDoc.exists) {
            sImageLink = oDoc.data().imageLink;
            console.log("IL: " + sImageLink);
            $('#imageDiv').append(`<img src='${sImageLink}' alt='not there'>`);
            console.log("IL2: " + sImageLink);
            //        $('#imageDiv').append(`<img src='./Roger2.jpg' alt='missed it'>`);
        }
    });
//}

//    function setEmotions(employee, emotionsObject) {


        //$("#doImage").attr ({src: sImageLink});