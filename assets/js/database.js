// Roger's functions - for now just calls and comments

console.log("Test");
var firebase = require('firebase');
const admin = require('firebase-admin');
//const storage = require('firebase-storage');

var config = {
  apiKey: "AIzaSyCsDh3ra7faSCJycuwelMipu-6biTdqFMM",
  authDomain: "rgb-rps.firebaseapp.com",
  databaseURL: "https://rgb-rps.firebaseio.com",
  projectId: "rgb-rps",
  storageBucket: "rgb-rps.appspot.com",
  messagingSenderId: "277284413470"
};
firebase.initializeApp(config);
var firestore = firebase.firestore();
const empRef = firestore.collection('employees');
var bucket = admin.storage().bucket();

console.log("Calling addImage");
addImage(Roger, '../pictures/Roger.jpg');

// Puts the image pointed to by the file name into storage
// for future use in identifying somebody.  And stores the image
// URL as part of the employee record.
function addImage(employee, fileName) {
  // File or Blob named mountains.jpg
  var file = fileName;

  // Create the file metadata
  var metadata = {
    contentType: 'image/jpeg'
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  var uploadTask = bucket.child('images/' + file.name).put(file, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function (snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    },
    function (error) {

      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;

        case 'storage/canceled':
          // User canceled the upload
          break;

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    function () {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log('File available at', downloadURL);
        // now have to set employee imageURL.
      });

    });
}

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