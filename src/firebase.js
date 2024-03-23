import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCKIu2K76S5EEejBOFiHNkXbbGSW8M8WHw",
  authDomain: "studyassist-b9911.firebaseapp.com",
  databaseURL: "https://studyassist-b9911-default-rtdb.firebaseio.com",
  projectId: "studyassist-b9911",
  storageBucket: "studyassist-b9911.appspot.com",
  messagingSenderId: "321242925675",
  appId: "1:321242925675:web:08527ad05c8c5e44ca3f2e",
  measurementId: "G-TMXGD38NJ8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);


if (import.meta.env.MODE === 'development'){
  connectFirestoreEmulator(db, "127.0.0.1", 8080),
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}

export { auth, db, functions};
export default app;