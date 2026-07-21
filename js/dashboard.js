// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkkNqTAIuTnEUA-Bn4pgGHS_ZtmmQgJws",
  authDomain: "anchorlight-cf27d.firebaseapp.com",
  projectId: "anchorlight-cf27d",
  storageBucket: "anchorlight-cf27d.firebasestorage.app",
  messagingSenderId: "654797884067",
  appId: "1:654797884067:web:0407e2cdba44a1cdc70d16",
  measurementId: "G-T1YLJ6MDB9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const counterRef = doc(db, "stats", "visitors");
const visitorElement = document.getElementById("visitorCount");

async function loadCounter() {
  try {
    const counted = localStorage.getItem("anchorlightVisitor");

    // Count this browser only once
    if (!counted) {
      await updateDoc(counterRef, {
        count: increment(1)
      });

      localStorage.setItem("anchorlightVisitor", "true");
    }

    // Read current count
    const snapshot = await getDoc(counterRef);

    if (snapshot.exists()) {
      const total = snapshot.data().count || 0;
      animateCounter(total);
    }
  } catch (err) {
    console.error(err);
    visitorElement.textContent = "--";
  }
}

function animateCounter(target) {
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 60));

  const timer = setInterval(() => {
    current += step;

    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    visitorElement.textContent = current.toLocaleString();
  }, 20);
}

loadCounter();
