var admin = require("firebase-admin");

/*
var serviceAccount = require("../../keys/admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://shareit-37233.firebaseio.com",
  storageBucket: "shareit-37233.appspot.com"
});
*/

// Uncomment when ready to deploy!
admin.initializeApp(); 

const db = admin.firestore();

module.exports = {admin, db}