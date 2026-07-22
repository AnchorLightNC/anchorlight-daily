import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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

const form = document.getElementById("storyForm");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    status.innerHTML = "Submitting your story...";

    const author =
        document.getElementById("author").value.trim() || "Anonymous";

    const title =
        document.getElementById("title").value.trim();

    const message =
        document.getElementById("message").value.trim();

    const consent =
        document.getElementById("consent").checked;

    if (!consent) {
        status.innerHTML =
            "<p>Please agree to the consent statement.</p>";
        return;
    }

    try {

        await addDoc(collection(db, "stories"), {

            author,
            title,
            message,

            approved: false,

            createdAt: serverTimestamp(),

            likes: 0,

            featured: false

        });

        form.reset();

        status.innerHTML = `
            <div class="success-message">
                <h2>❤️ Thank You!</h2>
                <p>Your story has been received.</p>
                <p>It will be reviewed before being published.</p>
            </div>
        `;

    } catch (error) {

        console.error(error);

        status.innerHTML = `
            <div class="error-message">
                Sorry, something went wrong.
                Please try again.
            </div>
        `;

    }
});
