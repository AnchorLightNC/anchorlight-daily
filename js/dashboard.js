// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Firebase configuration
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

// References
const visitorRef = doc(db, "stats", "visitors");
const storiesCollection = collection(db, "stories");

// Dashboard elements
const visitorElement = document.getElementById("visitorCount");
const storyElement = document.getElementById("storyCount");

// Load dashboard
async function loadDashboard() {

  try {

    // ----------------------------
    // VISITOR COUNTER
    // ----------------------------

    let visitorDoc = await getDoc(visitorRef);

    if (!visitorDoc.exists()) {
      await setDoc(visitorRef, {
        count: 0
      });

      visitorDoc = await getDoc(visitorRef);
    }

    const counted = localStorage.getItem("anchorlightVisitor");

    if (!counted) {

      await updateDoc(visitorRef, {
        count: increment(1)
      });

      localStorage.setItem("anchorlightVisitor", "true");
    }

    visitorDoc = await getDoc(visitorRef);

    const visitorCount = visitorDoc.data().count || 0;

    animateCounter(visitorCount);

    // ----------------------------
    // STORIES SHARED
    // ----------------------------

    const stories = await getDocs(storiesCollection);

    let totalStories = 0;

    stories.forEach((story) => {

      const data = story.data();

      if (data.approved === true) {
        totalStories++;
      }

    });

    storyElement.textContent = totalStories.toLocaleString();

  }

  catch (err) {

  console.error(err);

  visitorElement.textContent = err.code || err.message;
  storyElement.textContent = err.code || err.message;


  }

}

// Number animation
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

loadDashboard();
