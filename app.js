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

        document.getElementById("verse").textContent =
            currentEntry.verse || "";

        document.getElementById("anchorThought").textContent =
            currentEntry.anchorThought || "";

        document.getElementById("anchorPrayer").textContent =
            currentEntry.anchorPrayer || "";

        document.getElementById("captainsLog").textContent =
            currentEntry.captainsLog || "";

        document.getElementById("tomorrowsHeading").textContent =
            currentEntry.tomorrowsHeading || "";

    } catch (error) {

        console.error(error);

        document.getElementById("title").textContent =
            "Unable to load today's devotional";

        document.getElementById("quote").textContent =
            error.message;

    }

}

function copyQuote() {

    if (!currentEntry) return;

    navigator.clipboard.writeText(currentEntry.quote);

    alert("Quote copied!");

}

function shareQuote() {

    if (!currentEntry) return;

    const text =
`${currentEntry.title}

"${currentEntry.quote}"

Shared from AnchorLight Daily
https://anchorlightnc.github.io/anchorlight-daily/`;

    if (navigator.share) {

        navigator.share({
            title: currentEntry.title,
            text: text,
            url: "https://anchorlightnc.github.io/anchorlight-daily/"
        });

    } else {

        navigator.clipboard.writeText(text);

        alert("Devotional copied! You can now paste it anywhere.");

    }

}
function getShareText() {

    return `${currentEntry.title}

"${currentEntry.quote}"

${currentEntry.reflection}

📖 ${currentEntry.verse}

⚓ AnchorLight Daily
https://anchorlightnc.github.io/anchorlight-daily/`;

}

function shareFacebook() {

    const url = encodeURIComponent(
        "https://anchorlightnc.github.io/anchorlight-daily/"
    );

    window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank"
    );

}

function shareX() {

    const text = encodeURIComponent(
        `${currentEntry.title}

"${currentEntry.quote}"

https://anchorlightnc.github.io/anchorlight-daily/`
    );

    window.open(
        `https://twitter.com/intent/tweet?text=${text}`,
        "_blank"
    );

}

function shareEmail() {

    const subject = encodeURIComponent(currentEntry.title);

    const body = encodeURIComponent(getShareText());

    window.location =
        `mailto:?subject=${subject}&body=${body}`;

}
