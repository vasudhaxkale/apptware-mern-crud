require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

/* =========================
   Middleware
========================= */

// CORS configuration (dev + production safe)
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);

// Parse JSON request bodies
app.use(express.json());

/* =========================
   Routes
========================= */

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API Running' });
});

// Task routes
app.use('/api/tasks', taskRoutes);

/* =========================
   Server Start
========================= */

const startServer = async () => {
  try {
    await connectDB();
    console.log('MongoDB Connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server failed to start:', error.message);
    process.exit(1);
  }
};

startServer();
