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
  constructor(iFear, iAnger, iSad) {
    this.iFear = iFear;
    this.iAnger = iAnger;
    this.iSad = iSad;
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
    addEmployee(i, aoCompany[i]);
    if (aoCompany[i].sImageFile != "") {
      addImage(i, aoCompany[i].sImageFile);
    }
  }
}

//testGetImages ();

function testGetImages() {
  getImages().then(function (asImageLinks) {
    for (var i = 0; i < asImageLinks.length; i++) {
      console.log (asImageLinks[i]);
    }
  });
}

function addEmployee(iEmpNum, oEmployeeStats) {
  // takes an object (to be defined) that has all the
  // employee info (name, id, manager, ...)
  empsRef.doc(iEmpNum.toString().padStart(3, '0')).set({
    firstName: oEmployeeStats.sFirstName,
    lastNamee: oEmployeeStats.sLastName
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

//document.getElementById('files').addEventListener('change', handleFileSelect, false);

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
      let oData = oEmp.data();
      if (oData != undefined && oData.sImageLink != undefined) {
        asImageLinks[iEmp] = oData.sImageLink;
//        console.log(asImageLinks[iEmp]);
      }
      else {
        asImageLinks[iEmp] = "";
      }
    }
  }
  return (asImageLinks);
}

// testSetEmotions();

function testSetEmotions() {
  var oTestEmotions = new Emotions(4, 7, 6);
  setEmotions(0, oTestEmotions);
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
  event.preventDefault();
  var email= $("#email").val().trim();
  var password= $("#password").val().trim();
  console.log(empsRef);
  isManager(email, password).then(function (iMgr) {
    console.log(iMgr);
    if (iMgr > 0) {
      console.log("Success");
      $("#displayMessage").html("");
      $('#firstDiv').css('display', 'none');
      $('#contaianer').css('display', 'block');
      testListEmployees(iMgr);
    } else {
      console.log("Failure");
      if(email ===""|| password===""){
      $("#displayMessage").attr("class", "error");
      $("#displayMessage").html("Incorrect email/password");
      }else{
        $("#displayMessage").attr("class", "error");
        $("#displayMessage").html("Invalid Login");
      }
    }
  });
}

function displayEmployees(employees){
    return `<tr id="${employees.id}">
               <td>${employees.id}</td>
                <td>${employees.firstName+" "+employees.lastName}</td>
                <td>${employees.email}</td>
                <td>${employees.issues}</td>
            </tr>`;
}

async function isManager(email,password) {
  // returns employee ID if sPassword and sEmail match and the person is designated as a manager.  Else -1
  var query = empsRef.where('isManager', '==', true).where('password', '==', password).where('email', '==', email);
  let oDoc = await (query.get());
  if (oDoc.docs.length > 0) {
    return (parseInt(oDoc.docs[0].id));
  }
  return (-1);
}

//testListEmployees ();

function testListEmployees(iMgr) {
  listEmployees(iMgr).then(function (aoEmp) {
    console.log(aoEmp);
    $("tbody").append(displayEmployees(aoEmp));
  });
}

async function listEmployees(iManagerID) {
  // returns a list of the manager's employees' IDs
  aiEmp = [];
  var query = empsRef.where('managerID', '==', iManagerID);
  let oDoc = await(query.get());
  if (oDoc.docs.length > 0) {
    for (var i = 0; i < oDoc.docs.length; i++) {
      aiEmp.push(oDoc.docs[i].id);
    }
  }
   console.log("Employees: ", +aiEmp);
  $("tbody").append(displayEmployees(aiEmp));
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

// must call this with a then, as in the testDepression routine above
async function getDepressionResults(iEmpNum) {
  let sDepression = "";
  let oThisEmp = empsRef.doc(iEmpNum.toString().padStart(3, '0'));
  let oDoc = await (oThisEmp.get());
  sDepression = oDoc.data().sDepression;
  return (sDepression);
}