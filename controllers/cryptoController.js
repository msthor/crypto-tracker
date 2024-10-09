const Crypto = require('../models/Crypto');

async function getCryptoStats(req, res) {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: 'Coin parameter is required' });
  }

  try {
    const latestData = await Crypto.findOne({ coin }).sort({ timestamp: -1 });

    if (!latestData) {
      return res.status(404).json({ error: 'Crypto data not found' });
    }

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

  if (!coin) {
    return res.status(400).json({ error: 'Coin parameter is required' });
  }

  try {
    const data = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);

    if (data.length === 0) {
      return res.status(404).json({ error: 'Crypto data not found' });
    }

    const prices = data.map(item => item.price);
    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const squaredDifferences = prices.map(price => Math.pow(price - mean, 2));
    const variance = squaredDifferences.reduce((sum, diff) => sum + diff, 0) / prices.length;
    const standardDeviation = Math.sqrt(variance);

    res.json({
      deviation: parseFloat(standardDeviation.toFixed(2)),
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { getCryptoStats, getCryptoDeviation };