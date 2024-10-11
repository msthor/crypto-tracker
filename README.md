# Crypto Tracker

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technologies Used](#technologies-used)
3. [Setup and Installation](#setup-and-installation)
4. [Environment Variables](#environment-variables)
5. [API Endpoints](#api-endpoints)
   - [1. Fetch Cryptocurrency Data](#1-fetch-cryptocurrency-data)
   - [2. Get Latest Stats](#2-get-latest-stats)
   - [3. Calculate Price Deviation](#3-calculate-price-deviation)
6. [Running the Application](#running-the-application)

## Project Overview
The Crypto Tracker project is a Node.js application that fetches and stores real-time cryptocurrency data for Bitcoin, Matic (Polygon), and Ethereum. It provides APIs to retrieve the latest cryptocurrency statistics and calculate price deviations over time.

## Technologies Used
- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web framework for building APIs in Node.js.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **MongoDB**: NoSQL database for storing cryptocurrency data.
- **Axios**: Promise-based HTTP client for making API requests.
- **CoinGecko API**: Public API for fetching cryptocurrency data.

## Setup and Installation
1. **Clone the Repository**
   ```bash
   git clone https://github.com/shubhu121/crypto-tracker.git
   cd crypto-tracker
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up MongoDB**
   - Create a MongoDB Atlas account or install MongoDB locally.
   - Set up a database and a user with appropriate permissions.

4. **Configure Environment Variables**
   - Create a `.env` file in the root of the project and add the following:
     ```
     MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/crypto-tracker?retryWrites=true&w=majority
     PORT=3000
     ```
   - Replace `<username>` and `<password>` with your MongoDB credentials.

## API Endpoints

### 1. Fetch Cryptocurrency Data
- **Endpoint**: `/fetch-data`
- **Method**: `POST`
- **Description**: Triggers a background job to fetch and store the current price, market cap, and 24-hour change of Bitcoin, Matic, and Ethereum.

### 2. Get Latest Stats
- **Endpoint**: `/stats`
- **Method**: `GET`
- **Query Parameters**:
  - `coin`: (required) The cryptocurrency to fetch data for (e.g., `bitcoin`, `matic-network`, `ethereum`).
- **Response**:
  ```json
  {
      "price": 40000,
      "marketCap": 800000000,
      "24hChange": 3.4
  }
  ```

### 3. Calculate Price Deviation
- **Endpoint**: `/deviation`
- **Method**: `GET`
- **Query Parameters**:
  - `coin`: (required) The cryptocurrency to calculate deviation for (e.g., `bitcoin`, `matic-network`, `ethereum`).
- **Response**:
  ```json
  {
      "deviation": 4082.48  //(example)
  }
  ```

## Running the Application
To run the application locally, use the following command:
```bash
node index.js
```
The server will start on the specified port (default: `3000`).
