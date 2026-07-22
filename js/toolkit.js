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
// Mood Tracker

const mood = document.getElementById("mood");
const saveMood = document.getElementById("saveMood");
const moodMessage = document.getElementById("moodMessage");

const savedMood = localStorage.getItem("anchorlightMood");

if (savedMood) {

    mood.value = savedMood;

}

saveMood.addEventListener("click", () => {

    if (!mood.value) {

        moodMessage.textContent = "Please select a mood.";

        return;

    }

    localStorage.setItem("anchorlightMood", mood.value);

    const messages = {

        "😁 Great":"Keep shining your light today!",
        "🙂 Good":"Celebrate the small victories.",
        "😐 Okay":"One step at a time. You're doing better than you think.",
        "😔 Struggling":"You don't have to carry this alone. Reach out to someone you trust.",
        "😢 Having a Hard Day":"Hard days don't last forever. Remember—asking for help is a sign of strength."

    };

    moodMessage.textContent = messages[mood.value];

});
// Recovery Goals

const goalInput = document.getElementById("goalInput");
const addGoal = document.getElementById("addGoal");
const goalList = document.getElementById("goalList");

let goals = JSON.parse(localStorage.getItem("anchorlightGoals")) || [];

function saveGoals() {
    localStorage.setItem(
        "anchorlightGoals",
        JSON.stringify(goals)
    );
}

function renderGoals() {

    goalList.innerHTML = "";

    goals.forEach((goal, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <label>
                <input type="checkbox"
                       ${goal.completed ? "checked" : ""}>
                ${goal.text}
            </label>
        `;

        const checkbox = li.querySelector("input");

        checkbox.addEventListener("change", () => {
            goals[index].completed = checkbox.checked;
            saveGoals();
        });

        goalList.appendChild(li);

    });

}

addGoal.addEventListener("click", () => {

    const text = goalInput.value.trim();

    if (!text) return;

    goals.push({
        text,
        completed: false
    });

    saveGoals();

    renderGoals();

    goalInput.value = "";

});

renderGoals();
