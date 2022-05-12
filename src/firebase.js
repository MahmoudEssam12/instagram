// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDKVL7v2UGxUT5MvaVCIH8ZR5C04p1L1Uw",
    authDomain: "instagram-clone-7891b.firebaseapp.com",
    databaseURL: "https://instagram-clone-7891b.firebaseio.com",
    projectId: "instagram-clone-7891b",
    storageBucket: "instagram-clone-7891b.appspot.com",
    messagingSenderId: "757449397456",
    appId: "1:757449397456:web:31c1d84f2238ae0686bad5",
    measurementId: "G-LQK8SDL5YY"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };