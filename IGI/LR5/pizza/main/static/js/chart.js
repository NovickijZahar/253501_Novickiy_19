function tailorFunc(x, n){
    let res = Math.PI / 2;
    let temp = x;
    for (let i = 0; i < n; i++){
        res -= temp;
        temp *= x**2 * (2*i+1) / (4 * (2*i + 3) * (i + 1)**2);
    }
    return res;
}

function mathFunc(x){
    return Math.acos(x);
}

function calculate(x, eps) {
    for (let n = 1; n <= 500; n++){
        if (Math.abs(tailorFunc(x, n) - mathFunc(x)) <= eps){
            return [tailorFunc(x, n), n];
        }
    }
    return [tailorFunc(x, 500), 500]
}




const data = [];
const data2 = [];
for (let i = -1; i <= 1; i+=0.01){
    data.push({x: i, y: mathFunc(i)});
    data2.push({x: i, y: calculate(i, 0.001)[0]});
}


const totalDuration = 5000;
const delayBetweenPoints = totalDuration / data.length;
const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
const animation = {
    x: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: NaN,
        delay(ctx) {
            if (ctx.type !== 'data' || ctx.xStarted) {
                return 0;
            }
            ctx.xStarted = true;
            return ctx.index * delayBetweenPoints;
        }
    },
    y: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: previousY,
        delay(ctx) {
            if (ctx.type !== 'data' || ctx.yStarted) {
                return 0;
            }
            ctx.yStarted = true;
            return ctx.index * delayBetweenPoints;
        }
    },
    onComplete(animation) {
        let downloadLink = document.getElementById('downloadLink');
        downloadLink.href = myChart.toBase64Image();
        downloadLink.innerText = "Скачать график"
    },
};
// Animation-----

// Config-----
const config = {
    type: 'line',
    data: {
        datasets: [{
            backgroundColor: "red",
            borderColor: "red",
            borderWidth: 3,
            radius: 0,
            data: data,
            label: "Функция arcos(x)"
        },
        {
            backgroundColor: "green",
            borderColor: "green",
            borderWidth: 3,
            radius: 0,
            data: data2,
            label: "Ряд Тейлора для функции arccos(x)"
        }]
    },
    options: {
        animation,
        interaction: {
            intersect: false
        },
        plugins: {
            legend: true
        },
        scales: {
            x: {
                type: 'linear'
            }
        }
    }
};
// Config-----


var myChart = new Chart(
    document.getElementById('myChart'),
    config
);

