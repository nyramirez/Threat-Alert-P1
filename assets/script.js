/* // Initialize Firebase
var config = {
    apiKey: "AIzaSyBSVPTQBNPl3m1xaE1X6nFbAV8TM04Een8",
    authDomain: "testdataflag.firebaseapp.com",
    databaseURL: "https://testdataflag.firebaseio.com",
    projectId: "testdataflag",
    storageBucket: "",
    messagingSenderId: "37097842834"
};
firebase.initializeApp(config);
const database = firebase.database();

function checkUser() {
    console.log("check user");
    var username = $("#username").val().trim();
    var exists=false;
    console.log("userName:" +username);
    console.log("I was here");
     database.once('value', function (snapshot) {
        exists = snapshot.child("username").exists();
        var lastlogin = snapshot.child("lastLogin").val();
        userExistsCallback(username, exists, lastlogin);
    });
    userExistsCallback(username, exists, lastlogin); 
}

function userExistsCallback(username, exists, lastlogin) {
    console.log("am I comming here");
    var randomDate = moment();
    var randomFormat = "MM/DD/YYYY";
    var convertedDate = moment(randomDate, randomFormat);
    var newLogin = moment(convertedDate).format("MMM Do, YYYY hh:mm:ss");
    var lastlogin = moment(lastlogin).isAfter(moment(newLogin));
    if (exists && !lastlogin) {
        console.log("I exist");
        const userData = {
            "name": username,
            "password": $("#password").val().trim(),
            "lastLogin": newLogin,
            "visited": "1"
        };
        database.ref().child(username).update(userData);
        console.log("Updated Data.");

    } else {
        console.log("I do not exist");
        const userData = {
            "name": username,
            "password": $("#password").val().trim(),
            "lastLogin": newLogin,
            "visited": "0"
        };

        database.ref().set(userData);
        console.log("New Data.");
        // Reset
        $("input").val("");
    }
}

$(document).ready(function () {
    $("#login").on("click", checkUser);
    console.log("I am here toooo");
});

 */
/* 
Email = {
    Send : function (to,from,subject,body,apikey)
       {
           if (apikey == undefined)
           {
               apikey = Email.apikey;
           }
           var nocache= Math.floor((Math.random() * 1000000) + 1);
           var strUrl = "http://directtomx.azurewebsites.net/mx.asmx/Send?";
           strUrl += "apikey=" + apikey;
           strUrl += "&from=" + from;
           strUrl += "&to=" + to;
           strUrl += "&subject=" + encodeURIComponent(subject);
           strUrl += "&body=" + encodeURIComponent(body);
           strUrl += "&cachebuster=" + nocache;
           Email.addScript(strUrl);
       },
       apikey : "",
       addScript : function(src){
               var s = document.createElement('img');
               s.setAttribute('style', 'opacity: 0.0; filter: alpha(opacity=0);');
               s.setAttribute('src', src);
               document.body.appendChild(s);
       }
   };

   $(document).ready(function () {
       console.log("i came to check");
    Email.apikey = "83c652af-4d45-44a1-a6c5-4c211c342f6f";
    Email.Send("agaur05@gmail.com","agaur05@gmail.com","Sent from JS API","Worked!");
}); */


/* Email.send("agaur05@gmail.com",
    "agaur05@gmail.com",
    "This is a subject",
    "this is the body",
    {token: " 244089d3-bcc8-447f-97d9-99635b53553b"}
); */

var templateVariables={
    from_name: "cam",
    to_name: "Akanksha",
    message_html: `
        <h1>Hi Akanksha</h1>
        <p>The emailjs SDK and API both work just fine. For free.</p>
    `,
    recipient:"agaur05@gmail.com"
};

emailjs.send('gmail', 'template_9Z51Po6f', templateVariables)
    .then(function (res) {
        console.log('success');
        
    },function (err) {
        console.log('nope',err);
        
    });