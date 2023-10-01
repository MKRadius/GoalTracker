import express from 'express';
import dotenv from 'dotenv';
import errorHandler from './middleware/errorMiddleware.js'; 
import connectToMongoDB from './config/db.js';

import userRouter from './routes/userRoutes.js';
import goalRouter from './routes/goalRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectToMongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => res.json({ message: "Goal Tracker API working..." }));

app.use(errorHandler);

app.use('/api/users', userRouter);
app.use('/api/goals', goalRouter);


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
