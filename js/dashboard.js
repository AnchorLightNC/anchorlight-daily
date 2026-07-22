import {
collection,
getCountFromServer,
query,
where
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { db } from "./firebase.js";

async function loadDashboard(){

const storiesRef = collection(db,"stories");

const totalStories =
await getCountFromServer(storiesRef);

document.getElementById("storyCount").textContent =
totalStories.data().count;

const approved =
query(
storiesRef,
where("approved","==",true)
);

const approvedCount =
await getCountFromServer(approved);

document.getElementById("publishedCount").textContent =
approvedCount.data().count;

// Placeholder until analytics is added
document.getElementById("visitorCount").textContent = "0";

// Replace this later with your JSON count
document.getElementById("beaconCount").textContent = "365";

}

loadDashboard();
