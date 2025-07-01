const axios = require('axios');
const Crypto = require('../models/Crypto');

const COIN_IDS = ['bitcoin', 'ethereum', 'matic-network'];

async function fetchCryptoData() {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: COIN_IDS.join(','),
        vs_currencies: 'usd',
        include_market_cap: true,
        include_24hr_change: true,
      },
    });

    for (const coinId of COIN_IDS) {
      const data = response.data[coinId];
      await Crypto.create({
        coin: coinId,
        price: data.usd,
        marketCap: data.usd_market_cap,
        change24h: data.usd_24h_change,
      });
    }

    console.log(' Crypto data fetched and stored successfully');
  } catch (error) {
    console.error(' Error fetching crypto data:', error.message);
  }
}

module.exports = { fetchCryptoData };
