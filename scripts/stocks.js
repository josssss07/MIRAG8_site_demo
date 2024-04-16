const ctx = document.getElementById('myChart');
const contName = document.getElementById('stock-name');
const price = document.getElementById('current-price');
const up = document.getElementById('up');
const down = document.getElementById('down');
const symbol = document.getElementById("symbol")
var chart;

symbol.onclick = (ev => ev.stopImmediatePropagation());

const [high, low, open, close] = [
    document.getElementById("high"),
    document.getElementById("low"),
    document.getElementById("open"),
    document.getElementById("close"),
]

async function chartPlot(valMap) {
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(valMap),
            datasets: [{
                label: 'Closing Price',
                data: Object.values(valMap),
                borderWidth: 3,
                borderColor: 'rgb(0,255,120)',
                pointBackgroundColor: 'rgb(0,255,200)'
            }]
        },
        options: {
            responsive: true,
            elements: {
                point: {
                    radius: 0
                }
            },
            plugins: {
                legend: {
                    display: false,
                }
            },
            layout: {
                padding: 20
            },
            scales: {
                x: {
                    // display: false
                },
                y: {
                    // display: false
                }
            }
        }
    });
}

async function fetchData(symbol) {
    const resp = await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo");
    // const resp = await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + symbol + "&interval=5min&apikey=");
    let json = (await resp.json());

    if (json["Error Message"]) {
        alert("Invalid Symbol");
        return null;
    }
    contName.textContent = symbol || 'IBM';
    return json["Time Series (5min)"];
}

async function prepChartData(json) {
    if (!json) {
        return;
    }

    const firstKey = Object.keys(json)[0].split(" ")[0];
    let data = Object.entries(json).filter(arg => {
        if (arg[0].startsWith(firstKey)) {
            return true;
        }
        return false;
    });

    const dayOpen = parseFloat(data[0][1]["1. open"]).toFixed(2);
    const dayClose = parseFloat(data[data.length - 1][1]['4. close']).toFixed(2);
    open.textContent = dayOpen
    close.textContent = dayClose
    price.textContent = dayClose
    low.textContent = data.reduce(
        (acc, value) => Math.min(acc, parseFloat(value[1]['4. close']).toFixed(2)), parseFloat(data[0][1]["1. open"]).toFixed(2)
    )
    high.textContent = data.reduce(
        (acc, value) => Math.max(acc, parseFloat(value[1]['4. close']).toFixed(2)), 0
    )

    if (dayClose < dayOpen) {
        up.classList.add("hide")
        down.classList.remove("hide")
    }
    else {
        up.classList.remove("hide")
        down.classList.add("hide")
    }

    const valMap = {};
    data.forEach(entry => {
        valMap[entry[0].slice(entry[0].indexOf(" "), entry[0].lastIndexOf(":"))] = entry[1]['4. close'];
    });
    return valMap;
}

async function orchestrate() {
    const value = symbol.value;
    fetchData(value)
        .then(prepChartData).then(chartPlot);
}

// fetchData().then(prepChartData).then(chartPlot);