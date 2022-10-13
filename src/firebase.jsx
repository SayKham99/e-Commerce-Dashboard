import {initializeApp} from 'firebase/app';
import {getDatabase} from "firebase/database"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAkmGUmTxDNf8T5v9K70Zw9vTne6YomxeU",
    authDomain: "vodiy-polymer.firebaseapp.com",
    projectId: "vodiy-polymer",
    storageBucket: "vodiy-polymer.appspot.com",
    messagingSenderId: "179377764678",
    appId: "1:179377764678:web:22200083c1ce635e99cd47",
    measurementId: "G-0PD1203Y9P"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);

