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

const empRef = firestore.collection('employees');  // after the settings call
var oThisRef = empRef.doc('Roger');
var sImageLink;
//var sTstImageLink = 'gs://rgb-rps.appspot.com/Roger.jpg';

//$('#imageDiv').append(`<img src='${sTstImageLink}' alt='Tst not there'>`);

oThisRef.get({}).then (oDoc => {
    if (oDoc.exists) {
        sImageLink = oDoc.data().imageLink;
        console.log ("IL: " + sImageLink);
        $('#imageDiv').append(`<img src='${sImageLink}' alt='not there'>`);
//        $('#imageDiv').append(`<img src='./Roger2.jpg' alt='missed it'>`);
    }
})

//$("#doImage").attr ({src: sImageLink});
