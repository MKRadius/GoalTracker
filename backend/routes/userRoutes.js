import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { registerUser, loginUser, getMe } from '../controllers/userController.js';

const userRouter = express.Router();

// Register a new user
userRouter.post('/', registerUser);

// Log in a user
userRouter.post('/login', loginUser);

// Get user data
userRouter.get('/me', protect, getMe);


export default userRouter;