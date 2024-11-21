const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017/hotels';

// Establishing the connection
mongoose.connect(mongoURL).then(() => {
  console.log('Connected to MongoDB server');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Handling connection events
const db = mongoose.connection;

db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

module.exports = db;
