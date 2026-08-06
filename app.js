/* ==========================================
   AnchorLight Daily v4
   ========================================== */

const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december"
];

let currentEntry = null;

document.addEventListener("DOMContentLoaded", loadDevotional);

async function loadDevotional() {

    try {

        const today = new Date();

        const month = MONTHS[today.getMonth()];
        const day = today.getDate();

        const response = await fetch(`${month}.json?${Date.now()}`);

        if (!response.ok) {
            throw new Error(`Couldn't load ${month}.json`);
        }

        const devotionals = await response.json();

        currentEntry = devotionals.find(item => item.day === day);

        if (!currentEntry) {
            throw new Error(`No devotional found for day ${day}`);
        }

        document.getElementById("date").textContent =
            today.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric"
            });

        document.getElementById("title").textContent =
            currentEntry.title || "";

        document.getElementById("quote").textContent =
            `"${currentEntry.quote || ""}"`;

        document.getElementById("reflection").textContent =
            currentEntry.reflection || "";

        document.getElementById("challenge").textContent =
            currentEntry.challenge || "";

        document.getElementById("captainsLog").textContent =
            currentEntry.captainsLog || "";


    } catch (error) {

        console.error(error);

        document.getElementById("title").textContent =
            "Unable to load today's devotional";

        document.getElementById("quote").textContent =
            error.message;

    }
