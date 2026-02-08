require('dotenv').config();
require('crypto'); // Fix pour le bug crypto/randomUUID du SDK Azure

const express = require('express');
const cors = require('cors');

const articleRoutes = require('./routes/articles');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);

module.exports = app;
