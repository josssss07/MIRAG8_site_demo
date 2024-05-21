let currentDate = new Date();
let hours = currentDate.getHours().toString().padStart(2, '0');
let minutes = currentDate.getMinutes().toString().padStart(2, '0');
let formattedTime = `${hours}:${minutes}`;
const currentTime = new Date().getHours();
let greeting;
let currentTimeIndication = formattedTime;
let currenttimedata = formattedTime;
if(currentTime<12){
    let morning_greetings = [
        "Good morning!",
        "Have a great start to your day",
        "Glad to see you today",
        "Top of the morning!",
        "Rise and Shine",
        "I wish you a productive morning",
    ];
    greeting = morning_greetings[Math.floor(Math.random() * 6)];
}
else if(currentTime<17){
    let afternoons_greets = [
        'Good Afternoon!',
        "Hey There!",
        "Wishing you a delightful afternoon",
        'Hope you day is going as smoothly as possible',
        'Sending you warm afternoon regards',
        'Have a wonderful day ahead'
    ];  
    greeting = afternoons_greets[Math.floor(Math.random() * 6)];
}
else{
    let morning_greetings = [
        "Good Evening",
        "Enjoy your evening",
        "Hope you had a great day",
        "Make the most of your evening",
        "Enjoy your night",
        "Sleep well for a great day ",
    ];
    greeting = morning_greetings[Math.floor(Math.random() * 6)];
}
document.getElementById('greetings').textContent = greeting