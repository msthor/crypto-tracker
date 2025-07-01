const Crypto = require('../models/Crypto');

async function getCryptoStats(req, res) {
  const { coin } = req.query;
  if (!coin) return res.status(400).json({ error: 'Coin parameter is required' });

  try {
    const latestData = await Crypto.findOne({ coin: new RegExp(`^${coin}$`, 'i') }).sort({ timestamp: -1 });

    if (!latestData) return res.status(404).json({ error: 'Crypto data not found' });

    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      "24hChange": latestData.change24h,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

async function getCryptoDeviation(req, res) {
  const { coin } = req.query;
  if (!coin) return res.status(400).json({ error: 'Coin parameter is required' });

  try {
    const data = await Crypto.find({ coin: new RegExp(`^${coin}$`, 'i') }).sort({ timestamp: -1 }).limit(100);
    if (data.length === 0) return res.status(404).json({ error: 'Crypto data not found' });

    const prices = data.map(item => item.price);
    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const variance = prices.map(price => Math.pow(price - mean, 2)).reduce((sum, val) => sum + val, 0) / prices.length;
    const stdDeviation = Math.sqrt(variance);

    res.json({ deviation: parseFloat(stdDeviation.toFixed(2)) });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { getCryptoStats, getCryptoDeviation };
