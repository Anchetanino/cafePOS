// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCVNSTaB58crtIOw4Ju5-txn5tISqnC7y0",
    authDomain: "birdscafepos.firebaseapp.com",
    projectId: "birdscafepos",
    storageBucket: "birdscafepos.appspot.com",
    messagingSenderId: "821854607192",
    appId: "1:821854607192:web:c13a871ec9bbb9cdfe372d",
    measurementId: "G-GC1WP2LGT0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const analytics = getAnalytics(app);