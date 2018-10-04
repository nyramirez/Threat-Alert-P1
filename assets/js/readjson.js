// Initialize Firebase

const data = require('../../Crime-stats.json');
var firebase = require('firebase');
const admin = require('firebase-admin');

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
const collRef = firestore.collection('cities');

var cityRef;

data && Object.keys(data).forEach(key => {
    const nestedContent = data[key];

    if (typeof nestedContent === "object") {
        Object.keys(nestedContent).forEach(docTitle => {
            if (docTitle === "City") {
                // create the city document
                cityRef = nestedContent[docTitle];
                collRef.doc(cityRef).set({
                    name: cityRef
                });
            } else {
                let value = nestedContent[docTitle];
                // get rid of %, and the comma after thousands
                value = value.toString().replace(/[%,]/g,'');
                // all the values are numbers, so the following is OK
                collRef.doc(cityRef).update({
                    [docTitle]: Number(value)
                })
            }
        });
    }
});