const apiKey = '3A995C17-13A8-46D6-83EE-64C466830EF0';
const apiUrl = 'https://rest.coinapi.io/v1/exchanges';

async function fetchExchanges() {
    try {
        console.log('Fetching exchanges from API...');
        const response = await fetch(apiUrl, {
            headers: { 'X-CoinAPI-Key': apiKey }
        });

        if (!response.ok) {
            console.error('Network response was not ok:', response.statusText);
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Data fetched successfully:', data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function displayExchanges() {
    console.log('Displaying exchanges...');
    const exchanges = await fetchExchanges();
    const list = document.createElement('ul');
    document.body.appendChild(list);

    if (exchanges && exchanges.length > 0) {
        console.log('Number of exchanges fetched:', exchanges.length);
        exchanges.slice(0, 16).forEach(exchange => {
            const listItem = document.createElement('li');

            const name = exchange.name || 'N/A';
            const volume1hr = exchange.volume_1hrs_usd ? exchange.volume_1hrs_usd.toFixed(2) : 'N/A';
            const volume1day = exchange.volume_1day_usd ? exchange.volume_1day_usd.toFixed(2) : 'N/A';
            
            listItem.textContent = `Nombre: ${name}, Cotización por hora: ${volume1hr} USD, Cotización del día: ${volume1day} USD`;
            list.appendChild(listItem);
            console.log('Added exchange to list:', name, volume1hr, volume1day);
        });
    } else {
        console.log('No data found. Displaying message.');
        const noDataItem = document.createElement('li');
        noDataItem.textContent = 'No se encontraron datos.';
        list.appendChild(noDataItem);
    }
}

displayExchanges();
