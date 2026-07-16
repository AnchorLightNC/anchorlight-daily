// ===============================
// AnchorLight Daily v3
// ===============================

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

document.addEventListener("DOMContentLoaded", () => {
  loadDaily();
});

async function loadDaily() {
  try {
    const today = new Date();

    const monthName = MONTHS[today.getMonth()];
    const day = today.getDate();

    const response = await fetch(`${monthName}.json`);

    if (!response.ok) {
      throw new Error(`Unable to load ${monthName}.json`);
    }

    const data = await response.json();

    const entry = data.find(d => d.day === day);

    if (!entry) {
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
      entry.title;

    document.getElementById("quote").textContent =
      `"${entry.quote}"`;

    document.getElementById("reflection").textContent =
      entry.reflection;

    document.getElementById("challenge").textContent =
      entry.challenge;

    const verseBox = document.getElementById("verseBox");

    if (entry.verse) {
      verseBox.style.display = "block";
      document.getElementById("verse").textContent =
        entry.verse;
    }

    if (document.getElementById("anchorThought"))
      document.getElementById("anchorThought").textContent =
        entry.anchorThought || "";

    if (document.getElementById("anchorPrayer"))
      document.getElementById("anchorPrayer").textContent =
        entry.anchorPrayer || "";

    if (document.getElementById("captainsLog"))
      document.getElementById("captainsLog").textContent =
        entry.captainsLog || "";

    if (document.getElementById("tomorrowsHeading"))
      document.getElementById("tomorrowsHeading").textContent =
        entry.tomorrowsHeading || "";

    window.currentQuote = entry.quote;

  } catch (err) {

    console.error(err);

    document.getElementById("quote").textContent =
      "⚠ Unable to load today's encouragement.";

  }
}

function copyQuote() {

  if (!window.currentQuote) return;

  navigator.clipboard.writeText(window.currentQuote);

  alert("Quote copied!");

}

function shareQuote() {

  if (!window.currentQuote) return;

  if (navigator.share) {

    navigator.share({
      title: "AnchorLight Daily",
      text: window.currentQuote,
      url: window.location.href
    });

  } else {

    window.open(
      "https://www.facebook.com/sharer/sharer.php?u=" +
      encodeURIComponent(window.location.href),
      "_blank"
    );

  }

}
