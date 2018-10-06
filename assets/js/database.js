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

// the next three lines stop a firebase error message
const firestore = firebase.firestore(); //have to do this anyway
const settings = {
  timestampsInSnapshots: true
};
firestore.settings(settings);

class Employee {
  constructor(sFirstName, sLastName, sGender, bIsManager, sImageFile, sImageSize) {
    this.sFirstName = sFirstName;
    this.sLastName = sLastName;
    this.sGender = sGender;
    this.bIsManager = bIsManager;
    this.aoEmotions = [{}]; // of type Emotions
    this.sImageFile = sImageFile;
    this.sImageSize = sImageSize;
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

aoCompany[0] = new Employee("Roger", "Byford", "M", false, "Roger.jpg", 6846);
aoCompany[1] = new Employee("Akanksha", "Kapoor", "F", true, "Akanksha.jpg", 7919);
aoCompany[2] = new Employee("Aime", "Urquieta", "F", false, "", 0);
aoCompany[3] = new Employee("Nestor", "Ramirez", "M", false, "", 0);

const empsRef = firestore.collection('employees');

//addAllEmployees();

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
    gender: oEmployeeStats.sGender,
    isMamager: oEmployeeStats.bIsManager,
    email: oEmployeeStats.sEmail,
    password: oEmployeeStats.sPassword,
    sImageLink: oEmployeeStats.sImageLink
  });
}

var files = [];

function handleFileSelect(evt) {
  files = evt.target.files; // FileList object
  for (var i = 0; i < files.length; i++) {
    addImage(files[i]);
  }
  //    getImageLinks();
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);

// Puts the image pointed to by the file name into storage
// for future use in identifying somebody.  And stores the image
// URL as part of the employee record.
function addImage(oFile) {
  var sShortName = oFile.name;
  var sFullFileName = "../pictures/" + oFile.name;
  oFile.name = sFullFileName;
  var ImageRef = fbRef.child(oFile.name);

  ImageRef.put(oFile).then(function (snapshot) {
    console.log('Uploaded a file!');
  });
  ImageRef.getDownloadURL().then(function (url) {
    for (var iEmp = 0; iEmp < aoCompany.length; iEmp++) {
      if (aoCompany[iEmp].sImageFile === sShortName) {
        let oThisEmp = empsRef.doc(iEmp.toString().padStart(3, '0'));
        oThisEmp.update({
          //        oThisEmp.get().then(function (oDoc) {
          //          oDoc.update({
          sImageLink: url
        });
        //        });
        break;
      }
    }
  });
}

//getImages();

async function getImages() {
  // gets the URLS for all the images from storage, so we can pass them to
  // face++ for comparison with the current camera picture.
  // This will return an array of image links for the image URLs,
  // so we can get the employee id from the comparison.  The array is indexed
  // by employee ID.
  var asImageLinks = [];

  let oDoc = await (empsRef.get());
  if (oDoc.docs.length > 0) {
    for (var iEmp = 0; iEmp < oDoc.docs.length; iEmp++) {
      let oThisEmp = empsRef.doc(iEmp.toString().padStart(3, '0'));
      let oEmp = await (oThisEmp.get());
      asImageLinks[iEmp] = oEmp.data().sImageLink;
      console.log(asImageLinks[iEmp]);
    }
  }
  return (asImageLinks);
}

//testSetEmotions ();

function testSetEmotions ()  {
  var oTestEmotions = new Emotions (4, 7);
  setEmotions (0, oTestEmotions);
}

function setEmotions(iEmpNum, oEmotions) {
  // we'll have a definition of the emotionsObject
  // This will put each emotion's "score" into an
  // array (discarding the oldest if there are n stored
  // already).
  let oThisEmp = empsRef.doc(iEmpNum.toString().padStart(3, '0'));
  oThisEmp.get().then (oDoc => {
  //empsRef.doc(iEmpNum.toString().padStart(3, '0')).get().then(oDoc => {
    if (oDoc.exists) {
      let iNumEmotions = oDoc.data().aoEmotions.length;
      let aoEmotions = oDoc.data().aoEmotions;
      if (iNumEmotions >= EMOTIONS_MAX) { // should never be >
        for (var i = 0; i < EMOTIONS_MAX - 1; i++) {
          // move them all down 1
          aoEmotions[i] = aoEmotions[i + 1];
        }
        aoEmotions[EMOTIONS_MAX - 1] = oEmotions; // [9] is the latest
      } else { // less than max - just add this one
        aoEmotions[iNumEmotions] = oEmotions;
      }
      let oEmotion = aoEmotions[0];              // this will update
      let aoOdd = Object.assign ({}, aoEmotions);    // this will not
      oThisEmp.update({
        // aoEmotions: aoEmotions            will not work
        aoEmotions: firebase.firestore.FieldValue.arrayUnion(oEmotion)
//        aoEmotions: aoEmotions
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

testIsManager();

function testIsManager() {
  isManager("agaur05@gmail.com", "abc123").then(function (iMgr) {
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