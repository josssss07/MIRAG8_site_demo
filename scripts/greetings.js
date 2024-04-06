let currentDate = new Date();
let hours = currentDate.getHours().toString().padStart(2, '0');
let minutes = currentDate.getMinutes().toString().padStart(2, '0');
let formattedTime = `${hours}:${minutes}`;
console.log("formatted time: "+formattedTime);
const currentTime = new Date().getHours();
let greeting;
let currentTimeIndication = "The current time is : "+ formattedTime;

if(currentTime<12){
    greeting = "Good morning user";
}
else if(currentTime<17){
    greeting = "Good afternoon user";
}
else{
    greeting = "Good evening user"
}
document.getElementById('greetings').textContent = greeting


document.getElementById('current-time').textContent = currentTimeIndication