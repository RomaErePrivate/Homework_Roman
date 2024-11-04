import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import ec2Routes from './routes/ec2Routes';
import cors from 'cors';
import dotenv from 'dotenv';
import { auth } from './middleware/auth';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ec2', auth, ec2Routes);

// Connect to MongoDB
// @ts-ignore
mongoose.connect(process.env.MONGODB_URI).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch((err: Error) => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err)
    process.exit();
})

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));