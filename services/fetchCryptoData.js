const axios = require('axios');
const Crypto = require('../models/Crypto');

const fetchCryptoData = async () => {
    try {
        const coins = ['bitcoin', 'matic-network', 'ethereum'];
        const response = await axios.get(
            'https://api.coingecko.com/api/v3/simple/price',
            {
                params: {
                    ids: coins.join(','),
                    vs_currencies: 'usd',
                    include_market_cap: 'true',
                    include_24hr_change: 'true',
                },
            }
        );

        const data = response.data;

        // Save each coin's data
        for (const coin of coins) {
            const price = data[coin].usd;
            const marketCap = data[coin].usd_market_cap;
            const change24h = data[coin].usd_24h_change;

            await Crypto.create({
                coin,
                price,
                marketCap,
                change24h,
            });
        }

        console.log('Crypto data fetched and stored.');
    } catch (err) {
        console.error('Error fetching crypto data:', err);
    }
};

module.exports = fetchCryptoData;
