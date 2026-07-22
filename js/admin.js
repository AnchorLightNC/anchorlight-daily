// AnchorLight Admin Dashboard
// Version 2.0

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc
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

const visitorStat=document.getElementById("visitorStat");
const storyStat=document.getElementById("storyStat");
const pendingStat=document.getElementById("pendingStat");
const approvedStat=document.getElementById("approvedStat");
const storyList=document.getElementById("storyList");
const searchBox=document.getElementById("searchBox");
const allBtn=document.getElementById("allBtn");
const pendingBtn=document.getElementById("pendingBtn");
const approvedBtn=document.getElementById("approvedBtn");

let stories=[];
let currentFilter="all";

async function loadDashboard(){
  await loadVisitors();
  await loadStories();
}

async function loadVisitors(){
  const snap=await getDocs(collection(db,"stats"));
  snap.forEach(d=>{
    const data=d.data();
    if(data.count!==undefined){
      visitorStat.textContent=data.count.toLocaleString();
    }
  });
}

async function loadStories(){
  const q=query(collection(db,"stories"),orderBy("createdAt","desc"));
  const snap=await getDocs(q);
  stories=[];
  snap.forEach(d=>stories.push({id:d.id,...d.data()}));
  updateStats();
  renderStories();
}

function updateStats(){
  storyStat.textContent=stories.length;
  pendingStat.textContent=stories.filter(s=>!s.approved).length;
  approvedStat.textContent=stories.filter(s=>s.approved).length;
}

function renderStories(){
  storyList.innerHTML="";
  let filtered=[...stories];

  if(currentFilter==="pending") filtered=filtered.filter(s=>!s.approved);
  if(currentFilter==="approved") filtered=filtered.filter(s=>s.approved);

  const term=searchBox.value.toLowerCase().trim();
  if(term){
    filtered=filtered.filter(s=>
      (s.title||"").toLowerCase().includes(term)||
      (s.author||"").toLowerCase().includes(term)||
      (s.message||"").toLowerCase().includes(term)
    );
  }

  if(filtered.length===0){
    storyList.innerHTML="<div class='story'><h2>No stories found.</h2></div>";
    return;
  }

  filtered.forEach(s=>{
    const created=s.createdAt?.toDate ? s.createdAt.toDate().toLocaleDateString() : "";
    const card=document.createElement("div");
    card.className="story";
    card.innerHTML=`
      <h2>${s.title||"Untitled"}</h2>
      <div class="story-meta">👤 ${s.author||"Anonymous"} | 📅 ${created}</div>
      <div class="status ${s.approved?"approved":"pending"}">
        ${s.approved?"✅ Published":"⏳ Pending Review"}
      </div>
      <p>${s.message||""}</p>
      <div class="actions">
        <button class="publishBtn">Publish</button>
        <button class="unpublishBtn">Unpublish</button>
        <button class="deleteBtn">Delete</button>
      </div>
    `;
    const buttons=card.querySelectorAll("button");
    buttons[0].onclick=()=>setApproval(s.id,true);
    buttons[1].onclick=()=>setApproval(s.id,false);
    buttons[2].onclick=()=>removeStory(s.id);
    storyList.appendChild(card);
  });
}

async function setApproval(id,value){
  await updateDoc(doc(db,"stories",id),{approved:value});
  await loadStories();
}

async function removeStory(id){
  if(!confirm("Delete this story?")) return;
  await deleteDoc(doc(db,"stories",id));
  await loadStories();
}

searchBox.addEventListener("input",renderStories);

allBtn.onclick=()=>{currentFilter="all";renderStories();};
pendingBtn.onclick=()=>{currentFilter="pending";renderStories();};
approvedBtn.onclick=()=>{currentFilter="approved";renderStories();};

loadDashboard();
