const beacons = [

{
    title: "One Step at a Time",
    quote: "Recovery isn't about perfection. It's about choosing hope one step at a time.",
    tip: "Focus on today. Tomorrow will take care of itself.",
    challenge: "Encourage one person today."
},

{
    title: "Progress Over Perfection",
    quote: "Every small victory is proof that change is possible.",
    tip: "Celebrate your progress, no matter how small.",
    challenge: "Write down three things you're proud of."
},

{
    title: "The Storm Doesn't Last",
    quote: "No storm lasts forever. Keep moving toward the light.",
    tip: "When life feels heavy, reach out instead of isolating.",
    challenge: "Call or text someone who supports your recovery."
},

{
    title: "Keep Going",
    quote: "You've survived 100% of your hardest days. Don't quit now.",
    tip: "Take recovery one hour at a time if you need to.",
    challenge: "Spend ten minutes doing something healthy."
},

{
    title: "Hope Lives Here",
    quote: "Hope grows stronger every time you refuse to give up.",
    tip: "Remember why you started your recovery journey.",
    challenge: "Share one positive thing with someone today."
}

];

const today = new Date();

const index =
    today.getDate() % beacons.length;

const beacon = beacons[index];

document.getElementById("beaconDate").textContent =
    today.toLocaleDateString(undefined,{
        weekday:"long",
        month:"long",
        day:"numeric",
        year:"numeric"
    });

document.getElementById("beaconTitle").textContent =
    beacon.title;

document.getElementById("beaconQuote").textContent =
    beacon.quote;

document.getElementById("recoveryTip").textContent =
    beacon.tip;

document.getElementById("dailyChallenge").textContent =
    beacon.challenge;

document.getElementById("shareButton")
.addEventListener("click", async ()=>{

    if(navigator.share){

        try{

            await navigator.share({

                title:"AnchorLight Daily Beacon",

                text:
`${beacon.title}

${beacon.quote}

🌊 Find Your Way Back
AnchorLight`

            });

        }catch(e){}

    }else{

        navigator.clipboard.writeText(

`${beacon.title}

${beacon.quote}

🌊 Find Your Way Back
AnchorLight`

        );

        alert("Today's Beacon copied to your clipboard!");

    }

});
