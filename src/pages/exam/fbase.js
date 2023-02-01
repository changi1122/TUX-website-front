import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAFPvI2CdhBdI3xYrU-p0bs14q0srDyx-I",
    authDomain: "tux-website.firebaseapp.com",
    projectId: "tux-website",
    storageBucket: "tux-website.appspot.com",
    messagingSenderId: "1022112403006",
    appId: "1:1022112403006:web:7dfbb727edae5f6fabcb6f",
    measurementId: "G-L71E2NT27D"
};

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app);