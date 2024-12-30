import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlx5MOsJH3D21G5BNd_LN0mnJAjY3Ii54",
 // authDomain: "TU_DOMAIN.firebaseapp.com",
  projectId: "elvalecliente",
  storageBucket: "elvalecliente.appspot.com",
  //messagingSenderId: "TU_SENDER_ID",
  appId: "elvalecliente"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }; 