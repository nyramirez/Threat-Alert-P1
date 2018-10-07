// set up Firebase
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
//var RogerImageRef = fbRef.child('Roger.jpg');

// the next three lines stop a firebase error message
const firestore = firebase.firestore(); //have to do this anyway
const settings = {
  timestampsInSnapshots: true
};
firestore.settings(settings);

class Employee {
  constructor(sFirstName, sLastName, sGender, bIsManager, sImageFile, sImageSize, sEmail) {
    this.sFirstName = sFirstName;
    this.sLastName = sLastName;
    this.sGender = sGender;
    this.bIsManager = bIsManager;
    this.aoEmotions = [{}]; // of type Emotions
    this.sImageFile = sImageFile;
    this.sImageSize = sImageSize;
    this.sImageLink = "";
    this.email = sEmail;
  }
}

var aoCompany = [{}];

class Emotions {
  constructor(iFear, iAnger, iSad) {
    this.iFear = iFear;
    this.iAnger = iAnger;
    this.iSad = iSad;
  }
}

const EMOTIONS_MAX = 10; // the number in the array

aoCompany[0] = new Employee("Roger", "Byford", "M", false, "Roger.jpg", 6846, "rgbyford@gmail.com");
aoCompany[1] = new Employee("Akanksha", "Kapoor", "F", true, "Akanksha.jpg", 7919, "agaur05@gmail.com");
aoCompany[2] = new Employee("Aime", "Urquieta", "F", false, "", 0, "7aime7@gamail.com");
aoCompany[3] = new Employee("Nestor", "Ramirez", "M", false, "", 0, "nyramirez@gmail.com");

const empsRef = firestore.collection('employees');

//addAllEmployees();

// walk through the employees, adding them
function addAllEmployees() {
  for (var i = 0; i < aoCompany.length; i++) {
    addEmployee(i, aoCompany[i]).then(function () {});
    // the following doesn't work, because of the inability to create File objects
    // (see below)
    //       if (aoCompany[i].sImageFile != "") {
    //         addImage(i, aoCompany[i].sImageFile);
    //       }
  }
}

async function addEmployee(iEmpNum, oEmployeeStats) {
  // takes an object that has all the
  // employee info (name, id, manager, ...)

  await (empsRef.doc(iEmpNum.toString().padStart(3, '0')).set({
    firstName: oEmployeeStats.sFirstName,
    lastName: oEmployeeStats.sLastName,
    sGender: oEmployeeStats.sGender,
    isManager: false,
    aiAnger: [],
    aiSad: [],
    aiFear: [],
    sDepression: "",
    email: oEmployeeStats.email,
    sImageLink: ""
  }));
}

/*
// the following is the only way to get File objects made that can be passed to "put"
// for adding an image to the Firebase storage.  The documentation says you can't make
// File objects for security reasons.

var files = [];

function handleFileSelect(evt) {
  files = evt.target.files; // FileList object
  for (var i = 0; i < files.length; i++) {
    addImage(files[i]);
  }
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);
*/

// Puts the image pointed to by the file name into storage
// for future use in identifying somebody.  And stores the image
// URL as part of the employee record.
function addImage(oFile) {
  // the dialog box used to get the oFile doesn't give the path, so we have to add it
  var sShortName = oFile.name;
  var sFullFileName = "../pictures/" + oFile.name;
  oFile.name = sFullFileName;
  var oImageRef = fbRef.child(oFile.name);

  oImageRef.put(oFile).then(function (snapshot) {
    console.log('Uploaded a file!');
  });
  oImageRef.getDownloadURL().then(function (url) {
    for (var iEmp = 0; iEmp < aoCompany.length; iEmp++) {
      if (aoCompany[iEmp].sImageFile === sShortName) {
        let oThisEmp = empsRef.doc(iEmp.toString().padStart(3, '0'));
        oThisEmp.update({
          sImageLink: url
        });
        break;
      }
    }
  });
}

//testGetImages ();

function testGetImages() {
  getImages().then(function (asImageLinks) {
    for (var i = 0; i < asImageLinks.length; i++) {
      console.log(asImageLinks[i]);
    }
  });
}

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
      let oData = oEmp.data();
      if (oData != undefined && oData.sImageLink != undefined) {
        asImageLinks[iEmp] = oData.sImageLink;
        //        console.log(asImageLinks[iEmp]);
      } else {
        asImageLinks[iEmp] = "";
      }
    }
  }
  return (asImageLinks);
}

//testSetEmotions();

function testSetEmotions() {
  var oTestEmotions1 = new Emotions(4, 7, 6);
  var oTestEmotions2 = new Emotions(6, 8, 2);

  setEmotions(0, oTestEmotions1);
  let oDeltaEmotions = compareEmotions(0, oTestEmotions2);
  console.log(oDeltaEmotions);
  setEmotions(0, oTestEmotions2);
  oDeltatEmtions = compareEmotions(0, oTestEmotions1);
  console.log(oDeltaEmotions);
}

function setEmotions(iEmpNum, oEmotions) {
  // we'll have a definition of the emotionsObject
  // This will put each emotion's "score" into an
  // array (discarding the oldest if there are n stored
  // already).
  let oThisEmp = empsRef.doc(iEmpNum.toString().padStart(3, '0'));
  oThisEmp.get().then(oDoc => {
    if (oDoc.exists) {
      let iNumEmotions = oDoc.data().aiAnger.length;
      var aiFear = oDoc.data().aiFear;
      var aiAnger = oDoc.data().aiAnger;
      var aiSad = oDoc.data().aiSad;
      if (iNumEmotions >= EMOTIONS_MAX) {
        for (var i = 0; i < EMOTIONS_MAX - 1; i++) {
          // move them all down 1
          aiSad[i] = aiSad[i + 1];
          aiAnger[i] = aiAnger[i + 1];
          aiFear[i] = aiFear[i + 1];
        }
        aiSad[EMOTIONS_MAX - 1] = oEmotions.iSad;
        aiAnger[EMOTIONS_MAX - 1] = oEmotions.iAnger;
        aiFear[EMOTIONS_MAX - 1] = oEmotions.iFear;
      } else { // less than max - just add these
        aiSad[iNumEmotions] = oEmotions.iSad;
        aiAnger[iNumEmotions] = oEmotions.iAnger;
        aiFear[iNumEmotions] = oEmotions.iFear;
      }
      oThisEmp.update({
        aiAnger: aiAnger,
        aiSad: aiSad,
        aiFear: aiFear
      });
    }
    return;
  });
}

function compareEmotions(iEmpNum, oEmotions) {
  // returns a score, calculated by comparing 
  // the current score with the stored ones
  let iAnger = 0;
  let iFear = 0;
  let iSad = 0;
  let oDeltaEmotions = new Emotions(0, 0, 0);

  let oThisEmp = empsRef.doc(iEmpNum.toString().padStart(3, '0'));
  oThisEmp.get({}).then(oDoc => {
    if (oDoc.exists) {
      iNumEmotions = oDoc.oEmotions.length;
      if (iNumEmotions > 0) {
        for (var i = 0; i < iNumEmotions; i++) {
          iAnger += oDoc.oEmotions.iAnger[i];
          iFear += oDoc.oEmotions.iFear[i];
          iSad += oDoc.oEmotions.iSad[i];
        }
        iAnger /= iNumEmotions;
        iFear /= iNumEmotions;
        iSad /= iNumEmotions;
      }
      oDeltaEmotions.iAnger = oEmotions.iAnger - iAnger;
      oDeltaEmotions.iFear = oEmotions.iFear - iFear;
      oDeltatEmotions.iSad = oEmotions.iSad - iSad;
    }
    return (oDeltatEmotions);
  });
}

//testIsManager();

function testIsManager() {
  event.preventDefault();
  var email = $("#email").val().trim();
  var password = $("#password").val().trim();
  console.log(empsRef);
  isManager(email, password).then(function (iMgr) {
    console.log(iMgr);
    if (iMgr > 0) {
      console.log("Success");
    } else {
      console.log("Failure");
      if (email === "" || password === "") {
        $("#displayMessage").attr("class", "error");
        $("#displayMessage").html("Incorrect email/password");
      } else {
        $("#displayMessage").attr("class", "error");
        $("#displayMessage").html("Invalid Login");
      }
    }
  });
}


async function isManager(email, password) {
  // returns employee ID if sPassword and sEmail match and the person is designated as a manager.  Else -1
  var query = empsRef.where('isManager', '==', true).where('password', '==', password).where('email', '==', email);
  let oDoc = await (query.get());
  if (oDoc.docs.length > 0) {
    return (parseInt(oDoc.docs[0].id));
  }
  return (-1);
}

//testListEmployees();

function testListEmployees() {
  listEmployees(1).then(function (aiEmp) {
    console.log(aiEmp);
  });
}

async function listEmployees(iManagerID) {
  // returns a list of the manager's employees' IDs
  // must call this with a then - see testListEmployees
  aiEmp = [];
  var query = empsRef.where('managerID', '==', iManagerID);
  let oDoc = await (query.get());
  if (oDoc.docs.length > 0) {
    for (var i = 0; i < oDoc.docs.length; i++) {
      aiEmp.push(oDoc.docs[i].id);
    }
  }
  //  console.log("Employees: ", +aiEmp);
  return (aiEmp);
}

//testListEmployeeDetails();

function testListEmployeeDetails() {
  listEmployeeDetails(1).then(function (aoEmp) {
    console.log(aoEmp);
  });
}

async function listEmployeeDetails(iManagerID) {
  // returns an array of the manager's employees
  // must call this with a then - see testListEmployees
  var aoEmp = [];
  var query = empsRef.where('managerID', '==', iManagerID);
  let oDoc = await (query.get());
  if (oDoc.docs.length > 0) {
    for (var i = 0; i < oDoc.docs.length; i++) {
      let oThisEmp = empsRef.doc(oDoc.docs[i].id);
      let oEmpDoc = await (oThisEmp.get());
      aoEmp.push(oEmpDoc.data());
    }
  }
  return (aoEmp);
}

//testGetEmployeeDetails();

function testGetEmployeeDetails() {
  getEmployeeDetails(1).then(function (oEmp) {
    console.log(oEmp);
  });
}

async function getEmployeeDetails(iEmpNum) {
  // returns an object with the employee info
  // must call this with a then - see testListEmployees
  var oEmp;
  let oThisEmp = empsRef.doc(iEmpNum.toString().padStart(3, '0'));
  let oEmpDoc = await (oThisEmp.get());
  return (oEmpDoc.data());
}

//testDepression();

function testDepression() {
  putDepressionResults(0, "depressed");
  getDepressionResults(0).then(function (sDepression) {
    console.log("Depression: ", sDepression);
  });
}

function putDepressionResults(iEmpNum, sValue) {
  let oThisEmp = empsRef.doc(iEmpNum.toString().padStart(3, '0'));
  oThisEmp.get().then(oDoc => {
    if (oDoc.exists) {
      oThisEmp.update({
        sDepression: sValue
      });

    }
  });
}

async function getDepressionResults(iEmpNum) {
  // must call this with a then - see testDepression
  let sDepression = "";
  let oThisEmp = empsRef.doc(iEmpNum.toString().padStart(3, '0'));
  let oDoc = await (oThisEmp.get());
  sDepression = oDoc.data().sDepression;
  return (sDepression);
}