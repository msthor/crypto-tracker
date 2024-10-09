require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const { fetchCryptoData } = require('./services/fetchCryptoData');
const cryptoRoutes = require('./routes/cryptoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use('/api', cryptoRoutes);

// Background job to fetch crypto data every 2 hours
cron.schedule('0 */2 * * *', async () => {
  console.log('Fetching crypto data...');
  await fetchCryptoData();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});