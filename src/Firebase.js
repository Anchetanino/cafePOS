// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { getStorage, ref } from "firebase/storage";
import { getDatabase } from 'firebase/database';
import 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { enableIndexedDbPersistence } from 'firebase/firestore'; // Import enableIndexedDbPersistence

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDBKP5BtAGSiJb8YhwxVvBRVUeL8GA-sBo",
    authDomain: "cafepos-36249.firebaseapp.com",
    projectId: "cafepos-36249",
    storageBucket: "cafepos-36249.appspot.com",
    messagingSenderId: "545653020315",
    appId: "1:545653020315:web:4ab5b6c50c5877e81b983e",
    measurementId: "G-4VLWL7FDF5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

setPersistence(auth, browserSessionPersistence);
// Enable offline persistence for Firestore
enableIndexedDbPersistence(db)
    .then(() => {
        console.log('Offline persistence enabled successfully.');
    })
    .catch((error) => {
        if (error.code === 'failed-precondition') {
            console.error('Multiple tabs open, persistence can only be enabled in one tab at a time.');
        } else if (error.code === 'unimplemented') {
            console.error('The current browser does not support all of the features required to enable persistence.');
        }
    });



export { app, auth, storage, db };