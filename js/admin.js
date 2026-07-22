// ==========================================
// AnchorLight Admin Dashboard v2
// Part 1 - Firebase & Dashboard
// ==========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    query,
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

// Dashboard Elements

const visitorStat = document.getElementById("visitorStat");
const storyStat = document.getElementById("storyStat");
const pendingStat = document.getElementById("pendingStat");
const approvedStat = document.getElementById("approvedStat");

const storyList = document.getElementById("storyList");

const searchBox = document.getElementById("searchBox");

const allBtn = document.getElementById("allBtn");
const pendingBtn = document.getElementById("pendingBtn");
const approvedBtn = document.getElementById("approvedBtn");

// Global Data

let stories = [];

let currentFilter = "all";

// ==========================================
// Load Dashboard
// ==========================================

async function loadDashboard(){

    await loadVisitors();

    await loadStories();

}

// ==========================================
// Visitors
// ==========================================

async function loadVisitors(){

    const snapshot = await getDocs(collection(db,"stats"));

    snapshot.forEach(docSnap=>{

        const data = docSnap.data();

        if(data.count !== undefined){

            visitorStat.textContent =
                data.count.toLocaleString();

        }

    });

}

// ==========================================
// Stories
// ==========================================

async function loadStories(){

    stories = [];

    const q = query(
        collection(db,"stories"),
        orderBy("createdAt","desc")
    );

    const snapshot = await getDocs(q);

    snapshot.forEach(docSnap=>{

        stories.push({

            id:docSnap.id,

            ...docSnap.data()

        });

    });

    updateStats();

    renderStories();

}

// ==========================================
// Dashboard Stats
// ==========================================

function updateStats(){

    storyStat.textContent = stories.length;

    pendingStat.textContent =
        stories.filter(s=>!s.approved).length;

    approvedStat.textContent =
        stories.filter(s=>s.approved).length;

}

// ==========================================
// Placeholder
// (Part 2 will replace this)
// ==========================================

// ==========================================
// Render Story Cards
// ==========================================

function renderStories(){

    storyList.innerHTML = "";

    let filtered = [...stories];

    // Filter
    if(currentFilter === "pending"){
        filtered = filtered.filter(s => !s.approved);
    }

    if(currentFilter === "approved"){
        filtered = filtered.filter(s => s.approved);
    }

    // Search
    const search = searchBox.value.toLowerCase().trim();

    if(search){

        filtered = filtered.filter(story => {

            return (
                (story.title || "").toLowerCase().includes(search) ||
                (story.author || "").toLowerCase().includes(search) ||
                (story.message || "").toLowerCase().includes(search)
            );

        });

    }

    if(filtered.length === 0){

        storyList.innerHTML = `
            <div class="story">
                <h2>No stories found</h2>
                <p>Try another search or filter.</p>
            </div>
        `;

        return;

    }

    filtered.forEach(story => {

        const card = document.createElement("div");

        card.className = "story";

        let created = "Unknown";

        if(story.createdAt?.toDate){

            created =
                story.createdAt
                .toDate()
                .toLocaleDateString();

        }

        card.innerHTML = `

            <h2>${story.title || "Untitled Story"}</h2>

            <div class="story-meta">

                👤 ${story.author || "Anonymous"}

                &nbsp;&nbsp;|&nbsp;&nbsp;

                📅 ${created}

            </div>

            <div class="status ${story.approved ? "approved" : "pending"}">

                ${story.approved
                    ? "✅ Published"
                    : "⏳ Pending Review"}

            </div>

            <p>

                ${story.message || ""}

            </p>

            <div class="actions">

                <button
                    class="publishBtn"
                    onclick="publishStory('${story.id}')">

                    Publish

                </button>

                <button
                    class="unpublishBtn"
                    onclick="unpublishStory('${story.id}')">

                    Unpublish

                </button>

                <button
                    class="editBtn"
                    onclick="editStory('${story.id}')">

                    Edit

                </button>

                <button
                    class="deleteBtn"
                    onclick="deleteStory('${story.id}')">

                    Delete

                </button>

            </div>

        `;

        storyList.appendChild(card);

    });

}

// Start App

loadDashboard();
