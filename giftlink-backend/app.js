/*jshint esversion: 8 */
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import pinoHttp from 'pino-http';

import pinoLogger from './logger.js';
import connectToDatabase from './models/db.js';
import authRoutes from './routes/authRoutes.js';
import giftRoutes from './routes/giftRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import './util/import-mongo/index.js';

const app = express();
const port = 3060;

// Middleware
app.use(cors());
app.use(express.json());
app.use(pinoHttp({ logger: pinoLogger }));

// Route registration
app.use('/api/gifts', giftRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/', (req, res) => {
    res.send('Inside the server');
});

// Global error handler
app.use((err, req, res) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});

// Connect to MongoDB once when the application starts
connectToDatabase()
    .then(() => {
        pinoLogger.info('Connected to DB');
    })
    .catch((e) => {
        console.error('Failed to connect to DB', e);
    });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
