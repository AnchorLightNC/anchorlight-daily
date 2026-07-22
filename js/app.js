/* ==========================================
   AnchorLight v2
   app.js
========================================== */

// Quote of the Day

const quotes = [

"Recovery isn't about being perfect. It's about choosing hope one day at a time.",

"Your past may explain you, but it doesn't define you.",

"One small step today is still progress.",

"The storm didn't win. You did.",

"Hope grows stronger every time you refuse to give up.",

"Healing begins the moment you believe tomorrow can be different."

];

const quote = document.getElementById("dailyQuote");

if (quote) {

    const day = new Date().getDate();

    quote.textContent = `"${quotes[day % quotes.length]}"`;

}

/* ==========================================
   Animated Counters
========================================== */

function animateCounter(id, endValue) {

    const element = document.getElementById(id);

    if (!element) return;

    let start = 0;

    const duration = 1800;

    const step = Math.max(1, Math.ceil(endValue / (duration / 20)));

    const timer = setInterval(() => {

        start += step;

        if (start >= endValue) {

            start = endValue;

            clearInterval(timer);

        }

        element.textContent = start.toLocaleString();

    }, 20);

}

// Placeholder values until Firebase loads

animateCounter("visitorCount", 1250);
animateCounter("storyCount", 84);
animateCounter("supporterCount", 320);

/* ==========================================
   Fade In Sections
========================================== */

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.15

});

document.querySelectorAll("section").forEach(section => {

    section.classList.add("hidden");

    observer.observe(section);

});

/* ==========================================
   Smooth Button Hover
========================================== */

document.querySelectorAll(".primary-btn,.secondary-btn").forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.transform = "translateY(-4px)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "translateY(0px)";

    });

});

console.log("⚓ AnchorLight v2 Loaded");
