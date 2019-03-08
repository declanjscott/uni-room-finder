import * as firebase from "firebase/app";
import "firebase/firestore";
var config = {
  apiKey: "AIzaSyCm-Giazk2tdAQuzLekZg6pfmbQ9ZbbL_4",
  authDomain: "uni-room-finder.firebaseapp.com",
  databaseURL: "https://uni-room-finder.firebaseio.com",
  projectId: "uni-room-finder",
  storageBucket: "uni-room-finder.appspot.com",
  messagingSenderId: "759458638118"
};
firebase.initializeApp(config);
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
export default firebase;
