// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const studentRoutes = require('./routes/students');
const attendanceRoutes = require('./routes/attendance');

app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);
console.log('MONGO_URI:', process.env.MONGO_URI); // Debug line
// MongoDB Connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('MongoDB connection error:', err));
const path = require('path');

// Serve static files from the Front-end folder
app.use(express.static(path.join(__dirname, '../Front-end')));

// Route to serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Front-end', 'teacherdashboard.html'));
});

