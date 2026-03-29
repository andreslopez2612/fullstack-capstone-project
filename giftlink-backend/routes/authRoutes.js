import express from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import dotenv from 'dotenv';
import pino from 'pino';
import connectToDatabase from '../models/db.js';

const router = express.Router();

const logger = pino();  // Create a Pino logger instance

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Route: POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        // Task 1: Connect to `giftsdb` in MongoDB through `connectToDatabase` in `db.js`
        const db = await connectToDatabase();

        // Task 2: Access MongoDB collection
        const collection = db.collection("users");

        //Task 3: Check for existing email
        const existingEmail = await collection.findOne({ email: req.body.email });

        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(req.body.password, salt);
        const email = req.body.email;

        //Task 4: Save user details in database
        const newUser = await collection.insertOne({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hash,
            createdAt: new Date(),
        });

        const payload = {
            user: {
                id: newUser.insertedId,
            },
        };

        const authtoken = jwt.sign(payload, JWT_SECRET);
        logger.info('User registered successfully');
        res.json({ authtoken, email });
    } catch (e) {
        logger.error('Error during registration', e);
        return res.status(500).send('Internal server error');
    }
});

// Route: POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        // Task 1: Connect to `giftsdb` in MongoDB through `connectToDatabase` in `db.js`.
        const db = await connectToDatabase();
        // Task 2: Access MongoDB `users` collection
        const collection = db.collection("users");
        // Task 3: Check for user credentials in database
        const user = await collection.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }


        // Task 4: Task 4: Check if the password matches the encrypyted password and send appropriate message on mismatch
        const passwordMatch = await bcryptjs.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Task 5: Fetch user details from database
        const userName = `${user.firstName} ${user.lastName}`;
        const userEmail = user.email;

        const payload = {
            user: {
                id: user._id,
            },
        };
        // Task 6: Create JWT authentication if passwords match with user._id as payload
        const authtoken = jwt.sign(payload, JWT_SECRET);

        res.json({ authtoken, userName, userEmail });
        // Task 7: Send appropriate message if user not found
    } catch (e) {
        return res.status(500).send('Internal server error');

    }
});


export default router;