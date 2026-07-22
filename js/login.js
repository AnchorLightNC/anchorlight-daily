import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBkkNqTAIuTnEUA-Bn4pgGHS_ZtmmQgJws",
  authDomain: "anchorlight-cf27d.firebaseapp.com",
  projectId: "anchorlight-cf27d",
  storageBucket: "anchorlight-cf27d.firebasestorage.app",
  messagingSenderId: "654797884067",
  appId: "1:654797884067:web:0407e2cdba44a1cdc70d16",
  measurementId: "G-T1YLJ6MDB9"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

document
.getElementById("googleLogin")
.onclick = async () => {

  try {

    await signInWithPopup(auth, provider);

    window.location.href="admin.html";

  } catch(err){

    alert(err.message);

  }

};
