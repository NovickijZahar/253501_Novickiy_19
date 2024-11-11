function startCountdown() {
    let countdownElement = document.getElementById('countdown');
    let endTime = sessionStorage.getItem('endTime');

    if (!endTime) {
        let now = new Date();
        endTime = new Date(now.getTime() + 60 * 60 * 1000).getTime();
        sessionStorage.setItem('endTime', endTime);
    }

    function setTime(){
        let now = new Date().getTime();
        let distance = endTime - now;

        if (distance <= 0) {
            clearInterval(countdownInterval);
            sessionStorage.removeItem('endTime');
            countdownElement.innerHTML = 'Countdown finished';
        } else {
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            countdownElement.innerHTML = `${hours}:${minutes}:${seconds}`;
        }
    }
    setTime();
    let countdownInterval = setInterval(setTime, 1000);
};


startCountdown();