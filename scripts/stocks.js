const target = document.querySelector('#ticker');
const select = document.querySelector('#dropdown');
select.value = "0";
const exchanges = {
    '1': ['BKNG', 'AVGO', 'ORLY', 'LRCX'],
    '2': ['TSLA', 'AMD', 'NVDA', 'AAPL', 'META'],
    '3': ['BTC', 'ETH', 'BNB', 'ADA', 'XRP']
}

function Ticker(symbol, price, pc) {
    this.tItem = document.createElement('div');
    this.head = document.createElement('div');
    this.icon = document.createElement('div');
    this.change = document.createElement('div');
    this.title = document.createElement('span');
    this.percentage = document.createElement('span');
    this.b = document.createElement('b');
    this.img = document.createElement('img');
    this.imgdiv = document.createElement('div');

    this.tItem.classList.add('ticker-tape-item');
    this.head.classList.add('head');
    this.change.classList.add('change');
    this.b.classList.add('price');
    this.title.classList.add('title');
    this.percentage.classList.add('percentage');
    this.change.classList.add(parseFloat(pc) >= 0 ? 'up' : 'down');
    this.imgdiv.cssText = "width: 15px; height: 15px;";

    this.img.src = parseFloat(pc) >= 0 ? '../images/up.png' : '../images/down.png';
    this.img.alt = parseFloat(pc) >= 0 ? "UP" : "DOWN";
    this.img.classList.add('stockimg')

    this.tItem.appendChild(this.head);
    this.tItem.appendChild(this.imgdiv);
    this.tItem.appendChild(this.change);
    this.head.appendChild(this.title);
    this.head.appendChild(this.b);
    this.change.appendChild(this.percentage);
    this.imgdiv.appendChild(this.img);

    this.title.textContent = symbol;
    this.b.textContent = price;
    this.percentage.textContent = pc;
}

async function fetchCryptoData(symbol) {
    const resp = await fetch("https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=CNY&apikey=demo");
    let json = (await resp.json());

    if (json["Error Message"]) {
        alert("Invalid Symbol");
        return null;
    }
    const data = Object.values(Object.values(json)[1])[0];
    const open = parseFloat(Object.values(data)[1]);
    const close = parseFloat(Object.values(data)[7]);
    return { open, close, symbol };
}

async function fetchData(symbol = "IBM") {
    const resp = await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo");
    // const resp = await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + symbol + "&interval=5min&apikey=90A44CVZMZYC6EWG");
    let json = (await resp.json());

    if (json["Error Message"]) {
        alert("Invalid Symbol");
        return null;
    }
    return { symbol, json: json["Time Series (5min)"] };
}

async function prepData(json, symbol) {
    // console.log(json, symbol);
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


    return { symbol, dayOpen, dayClose };
}

async function getAllStocks() {
    const index = select.value.toString();
    if (index == 0) return target.replaceChildren();

    if (index == 3) return handleCryptoData(index);

    const exchange = exchanges[index];
    const fetched = await Promise.allSettled(exchange.map(stock => fetchData(stock)));
    const data = await Promise.allSettled(fetched.map(data => prepData(data.value.json, data.value.symbol)));
    target.replaceChildren();
    data.forEach(rawDatum => {
        const datum = rawDatum.value;
        const percent = (datum.dayClose - datum.dayOpen) * 100 / datum.dayOpen
        const elem = new Ticker(datum.symbol, datum.dayClose, percent ? `${percent.toFixed(3)}%` : NaN);
        target.appendChild(elem.tItem);
    })
    target.style.animation = 'none';
    target.offsetHeight; /* trigger reflow */
    target.style.animation = null;
}

async function handleCryptoData(index) {
    const cryptos = exchanges[index];
    const fetched = await Promise.allSettled(cryptos.map(token => fetchCryptoData(token)));
    target.replaceChildren();
    fetched.forEach(rawDatum => {
        const datum = rawDatum.value;
        const percent = (datum.close - datum.open) * 100 / datum.open
        const elem = new Ticker(datum.symbol, "$" + datum.close.toFixed(3), percent ? `${percent.toFixed(3)}%` : NaN);
        target.appendChild(elem.tItem);
    })
    target.style.animation = 'none';
    target.offsetHeight; /* trigger reflow */
    target.style.animation = null;
}
getAllStocks();