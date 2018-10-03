// Roger's functions - for now just calls and comments

//console.log("Test");
var firebase = require('firebase');
const admin = require('firebase-admin');
//var storage = require('@google-cloud/storage');
//const storage = require('firebase-storage');

var config = {
  credential: admin.credential.applicationDefault(),
  apiKey: "AIzaSyCsDh3ra7faSCJycuwelMipu-6biTdqFMM",
  authDomain: "rgb-rps.firebaseapp.com",
  databaseURL: "https://rgb-rps.firebaseio.com",
  projectId: "rgb-rps",
  storageBucket: "rgb-rps.appspot.com",
  messagingSenderId: "277284413470"
};
firebase.initializeApp(config);
//admin.initializeApp(config);
//var fbStorage = firebase.storage();
var serviceAccount = require("./rgb-rps-firebase-adminsdk-679jx-e13ef35a17.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rgb-rps.firebaseio.com",
  storageBucket: "rgb-rps.appspot.com"
});

// the next three lines stop a firebase error message
const firestore = firebase.firestore(); //have to do this anyway
const settings = {
  timestampsInSnapshots: true
};
firestore.settings(settings);

const {
  Storage
} = require('@google-cloud/storage');

const storage = new Storage();

var bucket = admin.storage().bucket();

console.log('Admin: ' + admin.auth());
console.log('Firebase: ' + firebase.auth());

console.log("Calling addImage");
addImage("Roger", '../pictures/Roger.jpg');

// Puts the image pointed to by the file name into storage
// for future use in identifying somebody.  And stores the image
// URL as part of the employee record.
function addImage(employee, fileName) {
  var file = fileName;

  const empRef = firestore.collection('employees');

  // Upload file
  bucket.upload('../images/' + fileName, function (err, file, apiResponse) {
    // Put the link into Firestore
    //    console.log("EmpRef: " + empRef.doc(employee));
    bucket.file('Roger.jpg').getSignedUrl({
      action: 'read',
      expires: '03-09-2491'
    }).then(results => {
      let url = results[0];
      //      console.log("U: " + url);
      empRef.doc(employee).update({
        imageLink: url
      });
    }).catch(function (err) {
      console.log("Error in gSU: " + err);
    })
  });



  //now downloading

  const options = {
    destination: './Roger2.jpg',
  };

  var srcFileName = 'Roger.jpg';

  storage.bucket(bucket.name)
    .file(srcFileName)
    .download(options)
    .then(() => {
      console.log(
        `gs://${config.storageBucket}/${srcFileName} downloaded to ${options}.`
      );
    })
    .catch(err => {
      console.error('ERROR:', err);
    });

  function getImages() {
    // gets the URLS for all the images from storage, so we can pass them to
    // face++ for comparison with the current camera picture.
    // This will return an array of objects with the
    // employee id and the image URL, so we can get the employee
    // id from the comparison.
  }

  function setEmotions(employee, emotionsObject) {
    // we'll have a defintion of the emotionsObject
    // This will put each emotion's "score" into an
    // array (discarding the oldest if there are n stored
    // already).
  }

  function compareEmotions(employee, emotionsOject) {
    // returns a score, calculated by comparing (in some way)
    // the current score with the stored ones
  }

  function newEmployee(employeeInfo) {
    // takes an object (to be defined) that has all the
    // employee info (name, id, manager, ...)
  }