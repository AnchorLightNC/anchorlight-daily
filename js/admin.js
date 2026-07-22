// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const storyList = document.getElementById("storyList");

async function loadStories() {

  storyList.innerHTML = "";

  const q = query(
    collection(db, "stories"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  snapshot.forEach((storyDoc) => {

    const story = storyDoc.data();

    const card = document.createElement("div");
    card.className = "story";

    card.innerHTML = `
      <h2>${story.title}</h2>

      <strong>Author:</strong> ${story.author}<br><br>

      <strong>Status:</strong>
      ${story.approved ? "✅ Approved" : "⏳ Waiting for Approval"}

      <p>${story.message}</p>

      <button class="approve">
        Approve
      </button>

      <button class="unapprove">
        Unapprove
      </button>

      <button class="delete">
        Delete
      </button>
    `;

    const buttons = card.querySelectorAll("button");

    // Approve
    buttons[0].onclick = async () => {

      await updateDoc(doc(db, "stories", storyDoc.id), {
        approved: true
      });

      loadStories();

    };

    // Unapprove
    buttons[1].onclick = async () => {

      await updateDoc(doc(db, "stories", storyDoc.id), {
        approved: false
      });

      loadStories();

    };

    // Delete
    buttons[2].onclick = async () => {

      if (!confirm("Delete this story?")) return;

      await deleteDoc(doc(db, "stories", storyDoc.id));

      loadStories();

    };

    storyList.appendChild(card);

  });

}

loadStories();
