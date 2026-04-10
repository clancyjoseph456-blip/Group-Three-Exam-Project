// Import packages
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// Default route
app.get('/', (req, res) => {
  res.send('API is running successfully 🚀');
});

// Routes (make sure these files exist)
try {
  app.use('/api/auth', require('./routes/authRoutes'));
  app.use('/api/groups', require('./routes/groupRoutes'));
} catch (err) {
  console.warn(' Some route files are missing:', err.message);
}

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});