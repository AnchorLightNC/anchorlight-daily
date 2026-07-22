// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
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

// Firestore collection
const storiesRef = collection(db, "stories");

// Form elements
const form = document.getElementById("storyForm");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const author =
    document.getElementById("author").value.trim() || "Anonymous";

  const title =
    document.getElementById("title").value.trim();

  const message =
    document.getElementById("message").value.trim();

  try {

    await addDoc(storiesRef, {
      author,
      title,
      message,
      approved: false,
      createdAt: serverTimestamp()
    });

    status.textContent =
      "✅ Thank you! Your story has been submitted for review.";

    status.style.color = "#22d3ee";

    form.reset();

  } catch (err) {

    console.error(err);

    status.textContent =
      "❌ Something went wrong. Please try again.";

    status.style.color = "#ff6b6b";

  }
});
