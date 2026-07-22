// Sobriety Tracker

const sobrietyDate = document.getElementById("sobrietyDate");
const calculateBtn = document.getElementById("calculateBtn");
const daysSober = document.getElementById("daysSober");

function calculateSobriety() {

    const start = sobrietyDate.value;

    if (!start) {
        daysSober.textContent = "Please select your sobriety date.";
        return;
    }

    localStorage.setItem("sobrietyDate", start);

    const startDate = new Date(start);
    const today = new Date();

    const diff =
        today.getTime() - startDate.getTime();

    const days =
        Math.floor(diff / (1000 * 60 * 60 * 24));

    let message = `🎉 You have been in recovery for ${days} day${days === 1 ? "" : "s"}!`;

    if (days >= 3650)
        message += "\n🏆 Incredible! 10 years of recovery!";
    else if (days >= 1825)
        message += "\n🏆 Amazing! 5 years!";
    else if (days >= 365)
        message += "\n🥇 Congratulations on 1 year!";
    else if (days >= 180)
        message += "\n🎖️ 6 months strong!";
    else if (days >= 90)
        message += "\n💪 90 days! Keep going!";
    else if (days >= 60)
        message += "\n👏 60 days!";
    else if (days >= 30)
        message += "\n🌟 30 days! Awesome work!";

    daysSober.innerHTML = message.replace(/\n/g, "<br>");

}

calculateBtn.addEventListener("click", calculateSobriety);

// Load saved sobriety date

const savedDate = localStorage.getItem("sobrietyDate");

if (savedDate) {

    sobrietyDate.value = savedDate;
    calculateSobriety();

}

// Gratitude Journal

const gratitude =
    document.getElementById("gratitude");

const saveGratitude =
    document.getElementById("saveGratitude");

const savedJournal =
    localStorage.getItem("gratitudeJournal");

if (savedJournal) {

    gratitude.value = savedJournal;

}

saveGratitude.addEventListener("click", () => {

    localStorage.setItem(
        "gratitudeJournal",
        gratitude.value
    );

    alert("✅ Your gratitude journal has been saved.");

});
