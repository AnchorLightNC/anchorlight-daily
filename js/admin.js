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

function renderStories(){

    storyList.innerHTML =
        "<h2 style='text-align:center'>Loading stories...</h2>";

}

// Start App

loadDashboard();
