const Crypto = require('../models/Crypto');

// Get latest stats
exports.getStats = async (req, res) => {
    const { coin } = req.query;

    try {
        const latestRecord = await Crypto.findOne({ coin }).sort({ timestamp: -1 });

        if (!latestRecord) {
            return res.status(404).json({ message: 'No data found for the requested coin.' });
        }

        res.json({
            price: latestRecord.price,
            marketCap: latestRecord.marketCap,
            "24hChange": latestRecord.change24h,
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get standard deviation
exports.getDeviation = async (req, res) => {
    const { coin } = req.query;

    try {
        const records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);
        if (records.length < 1) {
            return res.status(404).json({ message: 'Insufficient data for the requested coin.' });
        }

        const prices = records.map(record => record.price);
        const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
        const variance = prices.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / prices.length;
        const standardDeviation = Math.sqrt(variance).toFixed(2);

        res.json({ deviation: parseFloat(standardDeviation) });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
