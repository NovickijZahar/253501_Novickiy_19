function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const animations = [];
for (let pizza of document.getElementsByClassName('pizza')){
    const size = getRandomInt(50, 250);
    pizza.style.width = `${size}px`;
    pizza.style.height = `${size}px`;
    let a = getRandomInt(0, 3);
    if (a == 0){
        var frames = [{
            transform: `translate(-250px, ${getRandomInt(-250, 750)}px)`
        },
        {
            transform: `translate(1450px, ${getRandomInt(-250, 750)}px)`
        }];
    }
    else if(a == 1){
        var frames = [{
            transform: `translate(1450px, ${getRandomInt(-250, 750)}px)`
        },
        {
            transform: `translate(-250px, ${getRandomInt(-250, 750)}px)`
        }];
    }
    else if(a == 2){
        var frames = [{
            transform: `translate(${getRandomInt(-250, 1450)}px, -250px)`
        },
        {
            transform: `translate(${getRandomInt(-250, 1450)}px, 750px)`
        }];
    }
    else if(a == 3){
        var frames = [{
            transform: `translate(${getRandomInt(-250, 1450)}px, 750px)`
        },
        {
            transform: `translate(${getRandomInt(-250, 1450)}px, -250px)`
        }];
    }
    const config = {
        duration: getRandomInt(3000, 8000),          
        easing: "linear",
        iterations: Infinity,
        direction: "alternate"
    };
    animations.push(pizza.animate(frames, config));
}

let isPlayed = false;

function changeStatus(){
    if (isPlayed){
        animations.map(e => e.pause());
    }
    else{
        animations.map(e => e.play());
    }
    isPlayed = !isPlayed;
}