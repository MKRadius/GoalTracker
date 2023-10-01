import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} from '../controllers/goalController.js';

const goalRouter = express.Router();

// Route for getting goals (GET /api/goals)
goalRouter.get('/', protect, getGoals);

// Route for creating a new goal (POST /api/goals)
goalRouter.post('/', protect, setGoal);

// Route for updating a goal by ID (PUT /api/goals/:id)
goalRouter.put('/:id', protect, updateGoal);

// Route for deleting a goal by ID (DELETE /api/goals/:id)
goalRouter.delete('/:id', protect, deleteGoal);


export default goalRouter;