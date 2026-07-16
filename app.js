// AnchorLight Daily
// Loads today's entry from daily.json

const DATA_URL = "daily.json";

async function loadDailyContent() {
  try {
    const response = await fetch(DATA_URL);

    if (!response.ok) {
      throw new Error("Unable to load daily.json");
    }

    const data = await response.json();

    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const dayOfYear = Math.floor(
      (today - start) / (1000 * 60 * 60 * 24)
    );

    const entry = data[(dayOfYear - 1) % data.length];

    document.getElementById("date").textContent =
      today.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      });

    document.getElementById("quote").textContent =
      "“" + entry.quote + "”";

    document.getElementById("reflection").textContent =
      entry.reflection;

    document.getElementById("challenge").textContent =
      entry.challenge;

    window.currentQuote = entry.quote;

  } catch (error) {
    console.error(error);

    document.getElementById("quote").textContent =
      "Today's encouragement could not be loaded.";

    document.getElementById("reflection").textContent = "";

    document.getElementById("challenge").textContent = "";
  }
}

function copyQuote() {

  if (!window.currentQuote) return;

  navigator.clipboard.writeText(window.currentQuote);

  alert("Quote copied!");
}

function shareQuote() {

  const shareText = window.currentQuote + " — AnchorLight";

  if (navigator.share) {

    navigator.share({
      title: "AnchorLight Daily",
      text: shareText,
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

loadDailyContent();
