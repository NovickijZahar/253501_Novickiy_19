navigator.getBattery().then((battery) => {
    let bat = document.getElementById('battery');
    function getStatus(){
        if (battery.charging){
            bat.title = `${Math.round(battery.level * 100)}%(заряжается)`;
            bat.innerHTML = '<i class="fa-solid fa-battery-empty"></i>';
            setTimeout(() => {bat.innerHTML = '<i class="fa-solid fa-battery-quarter"></i>'}, 500);
            setTimeout(() => {bat.innerHTML = '<i class="fa-solid fa-battery-half"></i>'}, 1000);
            setTimeout(() => {bat.innerHTML = '<i class="fa-solid fa-battery-three-quarters"></i>'}, 1500);
            setTimeout(() => {bat.innerHTML = '<i class="fa-solid fa-battery-full"></i>'}, 2000);
            
        }
        else {
            if (battery.level < 0.1){
                bat.innerHTML = '<i class="fa-solid fa-battery-empty"></i>';
            }
            else if (battery.level < 0.25){
                bat.innerHTML = '<i class="fa-solid fa-battery-quarter"></i>';
            }
            else if (battery.level < 0.6){
                bat.innerHTML = '<i class="fa-solid fa-battery-half"></i>';
            }
            else if (battery.level < 0.9){
                bat.innerHTML = '<i class="fa-solid fa-battery-three-quarters"></i>';
            }
            else {
                bat.innerHTML = '<i class="fa-solid fa-battery-full"></i>';
            }
            bat.title = `${Math.round(battery.level * 100)}%`;
        };
        setTimeout(getStatus, 2500);
    }
    getStatus();
});

function hello(){    
    const synth = window.speechSynthesis;
    const textToSpeak = "Привет";
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
   
    utterance.lang = 'ru-RU'; 
    synth.speak(utterance);
}

function geolocation(){
    function successHandler(position) {
        alert(`Широта: ${position.coords.latitude}\nДолгота: ${position.coords.longitude}`);
    };
    function errorHandler(error) {  
        console.log(error.message); 
        console.log(error.code);    
    }
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
}