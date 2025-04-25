// /src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDkb4vJKOfnvvNlkqxjk7lMAljRGjOFkm4",
    authDomain: "hostelease-7e128.firebaseapp.com",
    projectId: "hostelease-7e128",
    storageBucket: "hostelease-7e128.firebasestorage.app",
    messagingSenderId: "551527652456",
    appId: "1:551527652456:web:c3074bdac1c2182c822fdd"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
