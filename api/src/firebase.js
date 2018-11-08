const firebase = require("firebase-admin");

const serviceAccount = require("../firebase-admin-cert.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});

const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

module.exports = { firebase, firestore };
