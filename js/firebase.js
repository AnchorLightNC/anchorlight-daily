/* ==========================================
   AnchorLight v2
   firebase.js
========================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    query,
    where,
    limit
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

/* ==========================================
   Firebase Config
========================================== */

const firebaseConfig = {

    apiKey: "YOUR_API_KEY",

    authDomain: "YOUR_PROJECT.firebaseapp.com",

    projectId: "YOUR_PROJECT",

    storageBucket: "YOUR_PROJECT.firebasestorage.app",

    messagingSenderId: "YOUR_SENDER_ID",

    appId: "YOUR_APP_ID"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

/* ==========================================
   Load Statistics
========================================== */

async function loadStoryCount() {

    try {

        const q = query(
            collection(db, "stories"),
            where("approved", "==", true)
        );

        const snapshot = await getDocs(q);

        const count = snapshot.size;

        const element = document.getElementById("storyCount");

        if (element) {

            element.textContent = count.toLocaleString();

        }

    }

    catch (error) {

        console.error(error);

    }

}

/* ==========================================
   Featured Story
========================================== */

async function loadFeaturedStory() {

    try {

        const q = query(
            collection(db, "stories"),
            where("approved", "==", true),
            limit(1)
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) return;

        const story = snapshot.docs[0].data();

        document.getElementById("featuredTitle").textContent =
            story.title || "Story of Hope";

        document.getElementById("featuredPreview").textContent =
            (story.message || "").substring(0, 180) + "...";

    }

    catch (error) {

        console.error(error);

    }

}

/* ==========================================
   Initialize
========================================== */

loadStoryCount();

loadFeaturedStory();
