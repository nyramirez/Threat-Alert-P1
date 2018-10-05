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

class Employee {
  constructor(iId, sFirstName, sLastName) {
    this.sFirstName = sFirstName;
    this.sLastName = sLastName;
    this.oEmotions = [{}]; // of type Emotions
    this.sImageFile = "";
    this.sImageLink = "";
  }
}

var oCompany = [{}];

class Emotions {
  constructor(iFear, iAnger) {
    this.iFear = iFear;
    this.iAnger = iAnger;
  }
}

const EMOTIONS_MAX = 10; // the number in the array

oComapny[0] = new Employee("Roger", "Byford", "Roger.jpg");
oCompany[1] = new Employee("Akanksha", "Kapoor", "");
oCompany[2] = new Employee("Aime", "77", "");
oCompany[3] = new Employee("Nestor", "Ramirez", "");

console.log("Calling addImage");
const empsRef = firestore.collection('employees');

// for debugging only
const options = {
  destination: './Roger2.jpg',
};

var srcFileName = 'Roger.jpg';

function showImages() {
  storage.bucket(bucket.name)
    .file(srcFileName)
    .download(options)
    .then(() => {
      console.log(`gs://${config.storageBucket}/${srcFileName} downloaded to ${options}.`);
    })
    .catch(err => {
      console.error('ERROR:' + err);
    });
}

// walk through the employees, adding them
for (var i = 0; i < oCompany.length; i++) {
  addEmployee(i, oCompany[i]);
  if (oCompany[i].sImageFile != "") {
    addImage(i, oCompany[i].sImageFile);
  }
}

function addEmployee(iEmpNum, oEmployeeStats) {
  // takes an object (to be defined) that has all the
  // employee info (name, id, manager, ...)
  empsRef.doc(iEmpNum).update({
    firstName: oEmployeeStats.sFirstName,
    lastNamee: oEmployeeStats.sLastName
  });
}

// Puts the image pointed to by the file name into storage
// for future use in identifying somebody.  And stores the image
// URL as part of the employee record.
function addImage(iEmployee, sFileName) {
  var sFullFileName = "../pictures/" + sFileName;

  // Upload file
  bucket.upload(sFullFileName)
    .then(() => {
      // Put the link into Firestore
      bucket.file(sFileName.getSignedUrl({
          action: 'read',
          expires: '03-09-2491'
        })
        .then((results) => {
          let url = results[0];
          empsRef.doc(iEmployee).update({
            imageLink: url
          });
        })
        .catch(err => {
          console.log("Error in gSU: " + err);
        }));
    });
}



function getImages() {
  // gets the URLS for all the images from storage, so we can pass them to
  // face++ for comparison with the current camera picture.
  // This will return an array of Employee objects with the
  // employee id and the image URL, so we can get the employee
  // id from the comparison.
  var empFetched = [{}];

  for (var i = 0; i < oCompany.length; i++) {
    empsRef.get({}).then(oDoc => {
      if (oDoc.exists) {
        oEmp[i].sImageLink = oDoc.data().imageLink;
        oEmp[i].iEmployee = oDoc.data().iEmployee;
      }
    });
  }
  return (empFetched);
}

function setEmotions(iEmployee, oEmotions) {
  // we'll have a defintion of the emotionsObject
  // This will put each emotion's "score" into an
  // array (discarding the oldest if there are n stored
  // already).
  let oThisEmp = empsRef.doc(iEmployee);
  oThisEmp.get({}).then(oDoc => {
    if (oDoc.exists) {
      let iNumEmotions = oDoc.oEmotions.length;
      if (iNumEmotions >= EMOTIONS_MAX) { // should never be >
        for (var i = 0; i < EMOTIONS_MAX - 1; i++) {
          // move them all down 1
          oDoc.oEmotions[i] = oDoc.oEmotions[i + 1];
        }
        oDoc.oEmotions[EMOTIONS_MAX - 1] = oEmotions; // [9] is the latest
      } else { // less than max - just add this one
        oDoc.oEmotions[iNumEmotions] = oEmotions;
      }
      oDoc.update({
        oEmotions: oEmotions
      })
    }
  });
  return;
}

function compareEmotions(iEmployee, oEmotions) {
  // returns a score, calculated by comparing (in some way)
  // the current score with the stored ones
  let iAnger = 0;
  let iFear = 0;
  let oDeltaEmotions = new Emotions(0, 0);

  let oThisEmp = empsRef.doc(iEmployee);
  oThisEmp.get({}).then(oDoc => {
    if (oDoc.exists) {
      iNumEmotions = oDoc.oEmotions.length;
      if (iNumEmotions > 0) {
        for (var i = 0; i < iNumEmotions; i++) {
          iAnger += oDoc.oEmotions.iAnger[i];
          iFear += oDoc.oEmotions.iFear[i];
        }
        iAnger /= iNumEmotions;
        iFear /= iNumEmotions;
      }
      oDeltaEmotions.iAnger = oEmotions.iAnger - iAnger;
      oDeltaEmotions.iFear = oEmotions.iFear - iFear;
    }
  });
  return (oDeltatEmotions);
}

