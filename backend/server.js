import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRouter from './src/routes/auth.route.js';
import goalRouter from './src/routes/goal.route.js';
import habitRouter from './src/routes/habit.route.js';
import moodRouter from './src/routes/mood.route.js';
import resetRouter from './src/routes/reset.route.js';
dotenv.config();

const app = express()
app.use(express.json());
app.use(cors({origin: process.env.CORS_ORIGIN || '*', credentials: true }));

mongoose.set('debug', true);


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
}
)

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use('/api/auth', authRouter);
app.use('/api/goals', goalRouter);
app.use('/api/habits', habitRouter)
app.use('/api/mood', moodRouter)
app.use('/api/reset', resetRouter)



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});
