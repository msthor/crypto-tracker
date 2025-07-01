const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const { fetchCryptoData } = require('./services/fetchCryptoData');
const cryptoRoutes = require('./routes/cryptoRoutes');

const MONGO_URI = 'mongodb://localhost:27017/cryptoDB';
const PORT = 3000;

const app = express();

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  fetchCryptoData(); // fetch once at startup
})
.catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use('/api', cryptoRoutes);

// Fetch crypto data every 2 hours
cron.schedule('0 */2 * * *', async () => {
  await fetchCryptoData();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
