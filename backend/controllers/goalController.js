import { Goal } from '../models/goalModel.js';
import { User } from '../models/userModel.js';

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = async (req, res, next) => {
  try {
    const goal = await Goal.find({ user: req.user.id });

    res.status(200).json(goal);
    next();
  }
  catch (error) {
    console.log("Error occured in getting goals");
    console.log(error);
    res.status(400).json({ message: "Error occured in getting goals" });
  }
};

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = async (req, res, next) => {
  try {
    const { text } = req.body;

    const goal = new Goal({
      text: text,
      user: req.user.id
    });

    const createdGoal = await goal.save();

    res.status(201).json(createdGoal);
    next();
  }
  catch (error) {
    console.log("Error occured in adding goal");
    console.log(error);
    res.status(400).json({ message: "Error occured in adding goal" });
  }
};

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = async (req, res, next) => {
  try {
    const { text } = req.body;

    const goal = await Goal.findById(req.params.id);

    if (goal) {
      goal.text = text;

      const updatedGoal = await goal.save();

      res.status(201).json(updatedGoal);
    }
    else {
      res.status(404).json({ message: "Goal not found" });
    }
    next();
  }
  catch (error) {
    console.log("Error occured in updating goal");
    console.log(error);
    res.status(400).json({ message: "Error occured in updating goal" });
  }
};

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (goal) {
      await goal.remove();

      res.status(200).json({ message: "Goal removed" });
    }
    else {
      res.status(404).json({ message: "Goal not found" });
    }
    next();
  }
  catch (error) {
    console.log("Error occured in deleting goal");
    console.log(error);
    res.status(400).json({ message: "Error occured in deleting goal" });
  }
};

export {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
