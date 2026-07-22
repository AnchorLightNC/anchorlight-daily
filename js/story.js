import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc
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

const title = document.getElementById("storyTitle");
const author = document.getElementById("storyAuthor");
const message = document.getElementById("storyMessage");

const params = new URLSearchParams(window.location.search);
const storyId = params.get("id");

async function loadStory() {

    if (!storyId) {
        title.textContent = "Story Not Found";
        message.textContent = "No story was specified.";
        return;
    }

    try {

        const storyRef = doc(db, "stories", storyId);
        const storySnap = await getDoc(storyRef);

        if (!storySnap.exists()) {

            title.textContent = "Story Not Found";
            message.textContent = "This story no longer exists.";
            return;

        }

        const story = storySnap.data();

        if (story.approved !== true) {

            title.textContent = "Unavailable";
            message.textContent = "This story has not been published.";
            return;

        }

        title.textContent = story.title || "Story of Hope";
        author.textContent = `By ${story.author || "Anonymous"}`;
        message.textContent = story.message || "";

        document.title = `${story.title || "Story of Hope"} | AnchorLight`;

    } catch (error) {

        console.error(error);

        title.textContent = "Error";
        message.textContent =
            "Something went wrong while loading this story.";

    }

}

loadStory();
