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
  constructor(sFirstName, sLastName, sGender, bIsManager, sImageFile, sImageSize, sEmail, iEmpID) {
    this.sFirstName = sFirstName;
    this.sLastName = sLastName;
    this.sGender = sGender;
    this.bIsManager = bIsManager;
    this.aoEmotions = [{}]; // of type Emotions
    this.sImageFile = sImageFile;
    this.sImageSize = sImageSize;
    this.sImageLink = "";
    this.email = sEmail;
    this.iempID = iEmpID;
  }
}

var aoCompany = [{}];
var aoEmp = [];
var myEmp, arrayID;
var totalIssues = 0;

class Emotions {
  constructor(iFear, iAnger, iSad) {
    this.iFear = iFear;
    this.iAnger = iAnger;
    this.iSad = iSad;
  }
}

const EMOTIONS_MAX = 10; // the number in the array

aoCompany[0] = new Employee("Roger", "Byford", "M", false, "Roger.jpg", 6846, "rgbyford@gmail.com", 0);
aoCompany[1] = new Employee("Akanksha", "Kapoor", "F", true, "Akanksha.jpg", 7919, "agaur05@gmail.com", 1);
aoCompany[2] = new Employee("Aime", "Urquieta", "F", false, "", 0, "7aime7@gamail.com", 2);
aoCompany[3] = new Employee("Nestor", "Ramirez", "M", false, "", 0, "nyramirez@gmail.com", 3);

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
// Heavily edited to allow usage for storing images in Firestore and 
// using them in face++
async function addImage(sEmployeeID, oFile) {
  // the dialog box used to get the oFile doesn't give the path, so we have to add it
  //   var sShortName = oFile.name;
  var sShortName = sEmployeeID;

  //  var sFullFileName = "../pictures/" + oFile.name;
  //  oFile.name = sFullFileName;
  var oImageRef = fbRef.child(oFile.name);
  await (oImageRef.put(oFile));
  //  oImageRef.put(oFile).then(function (snapshot) {
  console.log('Uploaded a file!');
  await (url = oImageRef.getDownloadURL());
  //        oImageRef.getDownloadURL().then(function (url) {
  // for (var iEmp = 0; iEmp < aoCompany.length; iEmp++) {
  //   if (aoCompany[iEmp].sImageFile === sShortName) {
  //     let oThisEmp = empsRef.doc(iEmp.toString().padStart(3, '0'));
  //     oThisEmp.update({
  //       sImageLink: url
  //     });
  //     break;
  //   }
  // }
  return (url);
  //        });
  // },
  // function (err) {
  //   console.log("Error: " + err);
  // });
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
  // No longer in use.  Intended for identifying an employee from his/her picture.
  // We dropped that feature.
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
  var oTestEmotions1 = new Emotions(7, 0, 0);
  //  var oTestEmotions2 = new Emotions(6, 8, 2);

  setEmotions(0, oTestEmotions1).then(() => {
    //    setEmotions(0, oTestEmotions2).then(() => {
    console.log(oTestEmotions1);
    //    });
  });
}
//  let oDeltaEmotions = compareEmotions(0, oTestEmotions2);
//  console.log(oDeltaEmotions);
//  oDeltatEmotions = compareEmotions(0, oTestEmotions1);
//  console.log(oDeltaEmotions);

//testGetEmotions ();

function testGetEmotions() {
  getEmotions(0).then(function (oEmotions) {
    console.log(oEmotions);
  });
}

async function getEmotions(iEmpNum) {
  emoThis = new Emotions(0, 0, 0);
  let oThisEmp = empsRef.doc(iEmpNum.toString().padStart(3, '0'));
  let oDoc = await (oThisEmp.get());
  if (oDoc.exists) {
    let iAngerLen = oDoc.data().aiAnger.length;
    let iFearLen = oDoc.data().aiFear.length;
    let iSadLen = oDoc.data().aiSad.length;
    if (iFearLen > 0) {
      emoThis.aiFear = oDoc.data().aiFear[iFearLen - 1];
    }
    if (iAngerLen > 0) {
      emoThis.aiAnger = oDoc.data().aiAnger[iAngerLen - 1];
    }
    if (iSadLen > 0) {
      emoThis.aiSad = oDoc.data().aiSad[iSadLen - 1];
    }
  }
  return (emoThis);
}

async function setEmotions(iEmpNum, oEmotions) {
  // we'll have a definition of the emotionsObject
  // This will put each emotion's "score" into an
  // array (discarding the oldest if there are n stored
  // already).
  // Changed to avoid having an array of objects in Firestore.  I wasn't
  // able to get that to work (although apparently it should).
  let oThisEmp = empsRef.doc(iEmpNum.toString().padStart(3, '0'));
  //oThisEmp.get().then(oDoc => {
  let oDoc = await (oThisEmp.get());
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
    await (oThisEmp.update({
      aiAnger: aiAnger,
      aiSad: aiSad,
      aiFear: aiFear
    }));
    console.log(oThisEmp);
  }
  return;
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

  console.log(empsRef);
  isManager(email, password).then(function (iMgr) {

  });
}

//displaying only those employees which have some issues
function displayEmployees(employees) {
  var length = employees.length;
  console.log("length:" + length);
  for (i = 0; i < length; i++) {
    var issues = 0;
    if (employees[i].aiAnger != 0 || employees[i].aiFear != 0 || employees[i].aiSad != 0) {
      issues += 1;
      $("tbody").append(`<tr id="${employees[i].empID}">
      <td>${employees[i].empID}</td>
       <td>${employees[i].firstName + " " + employees[i].lastName}</td>
       <td>${employees[i].email}</td>
       <td>${issues}</td>
       <td>${employees[i].assesResult}</td>
   </tr>`);
    }
    totalIssues += issues;
  }
  $("#pendingIssues").html(totalIssues);
}

// modified to add the HTML stuff
async function isManager() {
  event.preventDefault();
  var email = $("#email").val().trim();
  var password = $("#password").val().trim();
  var managerID;
  // returns employee ID if sPassword and sEmail match and the person is designated as a manager.  Else -1
  var query = empsRef.where('isManager', '==', true).where('password', '==', password).where('email', '==', email);
  let oDoc = await (query.get());
  if (oDoc.docs.length > 0) {
    managerID = (parseInt(oDoc.docs[0].id));
  } else {
    managerID = (-1);
  }
  console.log(managerID);
  if (managerID > 0) {
    localStorage.clear();
    localStorage.setItem("email", email);
    console.log("Success");
    $("#displayMessage").html("");
    $('#firstDiv').css('display', 'none');
    $('#contaianer').css('display', 'block');
    getEmployeeDetails(managerID, true);//is Manager//fetches managers name 
    listEmployeeDetails(managerID);
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
}

//testListEmployees();

function testListEmployees(managerID) {
  listEmployees(managerID).then(function (aiEmp) {
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
  return (aiEmp);
}

//testListEmployeeDetails();

function testListEmployeeDetails(managerID) {
  listEmployeeDetails(managerID).then(function (aoEmp) {
    console.log(aoEmp);
    $("tbody").append(displayEmployees(aoEmp));
  });
}

async function listEmployeeDetails(iManagerID) {
  // returns an array of the manager's employees with all details
  // must call this with a then - see testListEmployees
  var query = empsRef.where('managerID', '==', iManagerID);
  let oDoc = await (query.get());
  if (oDoc.docs.length > 0) {
    for (var i = 0; i < oDoc.docs.length; i++) {
      let oThisEmp = empsRef.doc(oDoc.docs[i].id);
      let oEmpDoc = await (oThisEmp.get());
      aoEmp.push(oEmpDoc.data());
    }
  }
  displayEmployees(aoEmp);
}

//testGetEmployeeDetails(0, false);

function testGetEmployeeDetails(empID, isFlag) {
  getEmployeeDetails(empID, isFlag).then(function (oEmp) {
    console.log(oEmp);
    if (isFlag) {
      $("#managerName").text(oEmp.firstName + " " + oEmp.lastName);
      $("#managerEE").text("Employee ID: " + empID);
    }
  });
}

async function getEmployeeDetails(iEmpNum, isFlag) {
  // displays the employee info
  // must call this with a then - see testListEmployees
  var oEmp;
  var oEmpty = new Employee("", "", "", false, "", "", "", 999);
  let oThisEmp = empsRef.doc(iEmpNum.toString().padStart(3, '0'));
  let oEmpDoc = await (oThisEmp.get());
  oEmp = (oEmpDoc.data());
  if (oEmp == undefined) { // invalid employee number
    return (oEmpty);
  }
  if (isFlag) {
    var mgrName = oEmp.firstName + " " + oEmp.lastName;
    $("#managerName").text(mgrName);
    $("#managerEE").text("Employee ID: " + iEmpNum);
    localStorage.setItem("ManagerName", mgrName);
  }
  return (oEmp);
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

function putAssessment(iEmpNum, sValue) {
  let oThisEmp = empsRef.doc(iEmpNum.toString().padStart(3, '0'));
  oThisEmp.get().then(oDoc => {
    if (oDoc.exists) {
      oThisEmp.update({
        assesResult: sValue
      });

    }
  });
}

async function getAssessment(iEmpNum) {
  // must call this with a then - see testDepression
  let sAssessment = "";
  let oThisEmp = empsRef.doc(iEmpNum.toString().padStart(3, '0'));
  let oDoc = await (oThisEmp.get());
  sAssessment = oDoc.data().assesResult;
  return (sAssessment);
}

function findArrayID() {
  // Find the employee in the array, fill in first and last names
  for (arrayID = 0; arrayID < aoEmp.length; arrayID++) {
    if (aoEmp[arrayID].empID === empID) {
      myEmp = aoEmp[arrayID].firstName + " " + aoEmp[arrayID].lastName;
      break;
    }
  }
}

function getValues() {
  var employeeName = myEmp;
  var managerEmail = localStorage.getItem("email");
  var managerName = localStorage.getItem("ManagerName");
  var templateVariables = {
    from_name: "Support Team",
    to_name: managerName,
    emp_name: employeeName,
    message_html: `
        <a href="https://nyramirez.github.io/Threat-Alert-P1/questionnaires.html">Click here for survey.</a>
    `,
    recipient: managerEmail
  };

  emailjs.send('gmail', 'template_Dz2E8H0d', templateVariables)
    .then(function (res) {
      console.log('success');
      $('.modal').modal();//initializes your modal
      $('#modal1').modal('open');//open up your modal
    }, function (err) {
      $('.modal').modal();
      $('#modal2').modal('open');
      console.log('nope', err);
    });
}