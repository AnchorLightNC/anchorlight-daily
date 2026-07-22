import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy
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

const storyGrid = document.getElementById("storyGrid");
const searchBox = document.getElementById("searchStories");

let stories = [];

async function loadStories() {

    storyGrid.innerHTML = "<p>Loading stories...</p>";

    try {

        const q = query(
            collection(db, "stories"),
            where("approved", "==", true),
            orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        stories = [];

        snapshot.forEach(doc => {

            stories.push({
                id: doc.id,
                ...doc.data()
            });

        });

        renderStories(stories);

    } catch (err) {

        console.error(err);

        storyGrid.innerHTML =
            "<p>Unable to load stories right now.</p>";

    }

}

function renderStories(list) {

    if (!list.length) {

        storyGrid.innerHTML =
            "<p>No stories have been published yet.</p>";

        return;

    }

    storyGrid.innerHTML = "";

    list.forEach(story => {

        const card = document.createElement("div");

        card.className = "story-card";

        const preview =
            (story.message || "").substring(0, 220);

        card.innerHTML = `

            <h2>${story.title || "Story of Hope"}</h2>

            <p class="author">
                By ${story.author || "Anonymous"}
            </p>

            <p>${preview}...</p>

            <a class="primary-btn"
               href="story.html?id=${story.id}">
               Read Story
            </a>

        `;

        storyGrid.appendChild(card);

    });

}

searchBox.addEventListener("input", () => {

    const search = searchBox.value.toLowerCase();

    const filtered = stories.filter(story =>

        (story.title || "").toLowerCase().includes(search) ||
        (story.author || "").toLowerCase().includes(search) ||
        (story.message || "").toLowerCase().includes(search)

    );

    renderStories(filtered);

});
async function loadFeaturedStory() {

    const featuredDiv =
        document.getElementById("featuredStory");

    try {

        const q = query(
            collection(db, "stories"),
            where("approved", "==", true),
            where("featured", "==", true)
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {

            featuredDiv.innerHTML = `
                <p>No featured story selected.</p>
            `;

            return;

        }

        const docSnap = snapshot.docs[0];

        const story = docSnap.data();

        featuredDiv.innerHTML = `

            <span class="featured-badge">
                ⭐ Featured Story
            </span>

            <h2>${story.title}</h2>

            <p class="featured-meta">

                By ${story.author || "Anonymous"}

            </p>

            <p>

                ${story.message.substring(0,300)}...

            </p>

            <a
                href="story.html?id=${docSnap.id}"
                class="primary-btn">

                Read Full Story

            </a>

        `;

    }

    catch(err){

        console.error(err);

    }

}
loadFeaturedStory();
loadStories();
