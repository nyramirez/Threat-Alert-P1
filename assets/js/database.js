// Roger's functions - for now just calls and comments

var config = {
  ///  credential: admin.credential.applicationDefault(),
  apiKey: "AIzaSyCsDh3ra7faSCJycuwelMipu-6biTdqFMM",
  authDomain: "rgb-rps.firebaseapp.com",
  databaseURL: "https://rgb-rps.firebaseio.com",
  projectId: "rgb-rps",
  storageBucket: "rgb-rps.appspot.com",
  messagingSenderId: "277284413470"
};
firebase.initializeApp(config);

var fbStorage = firebase.storage();
var fbRef = fbStorage.ref();
var RogerImageRef = fbRef.child('Roger.jpg');
///var serviceAccount = require("./rgb-rps-firebase-adminsdk-679jx-e13ef35a17.json");

/*
var serviceAccount = {
  type: "service_account",
  project_id: "rgb-rps",
  private_key_id: "e13ef35a174546fa5fcf7af9d182c284df22c533",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDPHnDq6bhNsnsg\njniasxXBTTkqpv58LVqZYWkXcuW42s4j8LaJbEqXZinRVtThrhyKDpA8HZDtPzeS\nWD73qbX8z5jCLYBON1SSrrNGrSjCIvrZE025enzwoVD+pAKnds/iKJvjyPbUEy5t\narTop+hrj82NfG4jPPwRpOfOElX4bwIuNwRAHgYcSMCpyb+08iIQJ22iVcKZW2MQ\nu6R5Y/aC9WUwYB5LQeOsZ0LM85mJKLGxKBwqIFeMR45JXeb52cMDxUqOPeqfv7j5\nqPR6uk/8uUEdg2Lwh40vkMvaB6oEWyhnbnn798NeUlXXoG1TsTdHkTex0EQ9Ij4q\nJFyqnh+FAgMBAAECggEAHcYFe29/pAOtOX/hjHOEBBaiyiPZX2ZxqKzdG5bTuSAT\nFA2NX/HmQx9XkZVG4u5RgfMX/txNMh2tUmdHHfkShTYegoNh91xy1ucwNE++FTJM\nFxp0SN53yWuXJhPTodkthxhJWJRSDyh2uxnkybEhcxzn8pfZiU1B+xNWk0QFgcHJ\nIL+ZuT5PYEfsdQNRrNqg71HVLUHs8vcV2q4oW/FCZr/O5V4WwloEsdVMBPKtOmhB\n4FGNLT51/wlEMZR1xzkRn3ZOfPHF9XgOsEZiymqSDRAo/glG1dCjX6/zJFbRIAY9\njgB+ccM5V5j3aQGcFqsx4fwQyW3D2zlRSaP99MTr3QKBgQD0FIKB5JJwqulyh9cg\niD8Tn6jCorziAqURJ5dWK9qL3iMKbt8BUrYdWW4AAGgMucVLxeMJ+D9FskyDPCT5\ntbbR7LA8nC8uk6M5ngFVEFDDRDDLApA5ggMDMn08ajSj+8g00pyYG8bHFtjvqlDE\n7CaBB3J+gPZXDCliPSQdDS6aawKBgQDZO9eatYrcRIcz6XzVdlS3YKHDLiRvFrKa\nJNBrs6Mq5RuthWW4EHbudpIrV32a9xNIjmE1jYtwpU/DbUoeKNvOYBlScVSSmfSo\nN7rHM+uBzp6GS5UzLzfZya7OY7u5MQ1n7lPXG67Lj+/m3uNsgcGkM9bNQixBBXZ+\npA9lHuSJzwKBgQDqQlUPvgUexarRFbdPrfR8LRyX0gFfGhK7aDhDqEtVOpp/BPJc\nHrpTaOW+cqVqsVG+6+qAQxbXGc19l1gVomYZDQYI5g4SsfhS8Gdu8P3Sq7v43Dj4\nOOQTSX4RYg2r5Ze9uvY4t1AM/MyxGdHzboN2C2PELpo/6Zg+hVgH2gMEiQKBgQDI\nxQ/9Qm/2J7e1eMQRHW4qlTqsA0dVDGtBH2kpQTs6d8je1H0wYrcoqZlqSVAjGttN\noZmiPxFyqLZRbf6kZSrRT+vXUDrTy0pc9jS/yvKMZAQLJmvchHVf6ZCP24kyHW3A\ncno2QrWIGZ2liLY0ILBxLCAIUHJKHdxoKwS3dpfN7QKBgEsPGPTwqq+WQTfTeqJJ\n2X356TZ64O3VAiBPQzN5IL88HvN0eqAVcswffXFwt7VDeVB/3JcJZfI4kMB4ssG2\nMV7WqIQYGC2KSxwOoBh12JRyl7lGg+Z0ZPZbqeBC00nP8l+dx0MzfLlEd1mtBqFp\ntokYBIVjwOZD1DbO523/0g1t\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-679jx@rgb-rps.iam.gserviceaccount.com",
  client_id: "105244866798034024459",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-679jx%40rgb-rps.iam.gserviceaccount.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rgb-rps.firebaseio.com",
  storageBucket: "rgb-rps.appspot.com"
});

*/

// the next three lines stop a firebase error message
const firestore = firebase.firestore(); //have to do this anyway
const settings = {
  timestampsInSnapshots: true
};
firestore.settings(settings);

//const {
//  Storage
//} = require('@google-cloud/storage');

//const storage = new Storage();

//var bucket = admin.storage().bucket();
//console.log (" " + bucket.name);

//var BUCKET = "rgb-rps.appspot.com";
//var storageRef11 = firebase.storage().ref();
var storageRef = fbStorage.bucket_;
//var bucket = storageRef11.bucket;
//console.log("BN: " + bucket.name);
//console.log('Admin: ' + admin.auth());
//console.log('Firebase: ' + firebase.auth());

class Employee {
  constructor(sFirstName, sLastName, sGender, bIsManager, sImageFile) {
    this.sFirstName = sFirstName;
    this.sLastName = sLastName;
    this.sGender = sGender;
    this.bIsManager = bIsManager;
    this.oEmotions = [{}]; // of type Emotions
    this.sImageFile = sImageFile;
    this.sImageLink = "";
  }
}

var aoCompany = [{}];

class Emotions {
  constructor(iFear, iAnger) {
    this.iFear = iFear;
    this.iAnger = iAnger;
  }
}

const EMOTIONS_MAX = 10; // the number in the array

aoCompany[0] = new Employee("Roger", "Byford", "M", false, "Roger.jpg");
aoCompany[1] = new Employee("Akanksha", "Kapoor", "F", true, "Akanksha.jpg");
aoCompany[2] = new Employee("Aime", "Urquieta", "F", false, "");
aoCompany[3] = new Employee("Nestor", "Ramirez", "M", false, "");

const empsRef = firestore.collection('employees');

addAllEmployees();

// walk through the employees, adding them
function addAllEmployees() {
  for (var i = 0; i < aoCompany.length; i++) {
    //    addEmployee(i, aoCompany[i]);
    if (aoCompany[i].sImageFile != "") {
      addImage(i, aoCompany[i].sImageFile);
    }
  }
}

// for debugging only
const options = {
  destination: './Roger2.jpg',
};

var srcFileName = 'Roger.jpg';

function showImages() {
  bucket(bucket.name)
    //    storage.bucket(BUCKET.name)
    //  BUCKET(BUCKET.name)
    .file(srcFileName)
    .download(options)
    .then(() => {
      console.log(`gs://${config.storageBucket}/${srcFileName} downloaded to ${options}.`);
    })
    .catch(err => {
      console.error('ERROR:' + err);
    });
}

function addEmployee(iEmpNum, oEmployeeStats) {
  // takes an object (to be defined) that has all the
  // employee info (name, id, manager, ...)
  empsRef.doc(iEmpNum.toString().padStart(3, '0')).set({
    firstName: oEmployeeStats.sFirstName,
    lastName: oEmployeeStats.sLastName,
    gender: oEmployeeStats.sGender
  });
}

/*
function getBucket() {
  var request = gapi.client.storage.buckets.get({
    'bucket': BUCKET
  });
  executeRequest(request, 'getBucket');
}
*/
// Puts the image pointed to by the file name into storage
// for future use in identifying somebody.  And stores the image
// URL as part of the employee record.
function addImage(iEmployee, sFileName) {
  var sFullFileName = "../pictures/" + sFileName;
  var file = new File([], sFullFileName);
  file.name = sFullFileName;

  // Upload file
  var ImageRef = fbRef.child(sFileName);
  
  ImageRef.put(file).then(function (snapshot) {
    console.log('Uploaded a file!');
  });
  //  BUCKET.upload(sFullFileName)
  // bucket.upload(sFullFileName)
  //     .then(() => {
  //       // Put the link into Firestore
  // //      BUCKET.file(sFileName.getSignedUrl({
  //       bucket.file(sFileName.getSignedUrl({
  //           action: 'read',
  //           expires: '03-09-2491'
  //         })
  //         .then((results) => {
  //           let url = results[0];
  //           empsRef.doc(iEmployee).update({
  //             imageLink: url
  //           });
  //         })
  //         .catch(err => {
  //           console.log("Error in gSU: " + err);
  //         }));
  //     });
}

function getImages() {
  // gets the URLS for all the images from storage, so we can pass them to
  // face++ for comparison with the current camera picture.
  // This will return an array of Employee objects with the
  // employee id and the image URL, so we can get the employee
  // id from the comparison.
  var aoEmpFetched = [{}];

  for (var i = 0; i < aoCompany.length; i++) {
    empsRef.get({}).then(oDoc => {
      if (oDoc.exists) {
        aoEmpFetched[i].sImageLink = oDoc.data().imageLink;
        aoEmpFetched[i].iEmployee = oDoc.data().iEmployee;
      }
    });
  }
  return (aoEmpFetched);
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

//testIsManager();

function testIsManager() {
  isManager("akapoor@gmail.com", "abc123").then(function (iMgr) {
    if (iMgr > 0) {
      console.log("Success: ", iMgr);
    } else {
      console.log("Failure");
    }
  });
}

async function isManager(sEmail, sPassword) {
  // returns employee ID if sPassword and sEmail match and the person is designated as a manager.  Else -1
  var query = empsRef.where('isManager', '==', true).where('password', '==', sPassword).where('email', '==', sEmail);
  let oDoc = await (query.get());
  if (oDoc.docs.length > 0) {
    return (parseInt(oDoc.docs[0].id));
  }
  return (-1);
}

//testListEmployees ();

function testListEmployees() {
  listEmployees(1).then(function (aoEmp) {
    console.log(aoEmp);
  });
}

async function listEmployees(iManagerID) {
  // returns a list of the manager's employees' IDs
  aiEmp = [];
  var query = empsRef.where('managerID', '==', iManagerID);
  let oDoc = await (query.get());
  if (oDoc.docs.length > 0) {
    for (var i = 0; i < oDoc.docs.length; i++) {
      aiEmp.push(oDoc.docs[i].id);
    }
  }
  console.log("Employees: ", +aiEmp);
  return (aiEmp);
}