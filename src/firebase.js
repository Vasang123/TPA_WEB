// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/storage";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCt5FmyZzFWAKMEFZplVJAMo8wvh63adPc",
  authDomain: "tpa-web-4d910.firebaseapp.com",
  projectId: "tpa-web-4d910",
  storageBucket: "tpa-web-4d910.appspot.com",
  messagingSenderId: "942055670191",
  appId: "1:942055670191:web:54a8fb506eb64c3b80ef5a",
  measurementId: "G-8Q0KKJK0JW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);