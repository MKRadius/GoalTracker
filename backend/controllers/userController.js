import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/userModel.js';
import { json } from 'express';

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all required fields" });
      // throw new Error("Missing required fields in registering user"); 
    }

    const emailCheck = await User.findOne({ email });

    if (emailCheck) {
      return res.status(400).json({ message: "Email already exists" });
      // throw new Error("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const data = {
      name: name,
      email: email,
      password: hashedPassword,
    };

    const newUser = await User.create(data);

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    const response = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: token,
    };

    res.status(201).json(response);
    next();

  } catch (error) {
    console.log("Error occured in adding user data");
    console.log(error);
    res.status(400).json({ message: "Error occured in adding user data" });
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all required fields" });
      // throw new Error("Missing required fields in login"); 
    }

    const emailCheck = await User.findOne({ email });

    if (!emailCheck) {
      return res.status(400).json({ message: "Email does not exist" });
      // throw new Error("Email does not exist");
    }

    const passwordCheck = await bcrypt.compare(password, emailCheck.password);

    if (!passwordCheck) {
      return res.status(400).json({ message: "Password is incorrect" });
      // throw new Error("Password is incorrect");
    }

    const token = jwt.sign(
      { id: emailCheck._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({ message: "User logged in", token: token });
    next();

  } catch (error) {
    console.log("Error occured in adding user data");
    console.log(error);
    res.status(404).json({ message: "Error occured in adding user login" });
  }
};

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);

    const data = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };

    res.status(200).json({ message: "User data retrieved", data: data });
  }
  catch (error) {
    console.log("Error occured in adding user data");
    console.log(error);
    res.status(400);
  }
};


export {
  registerUser,
  loginUser,
  getMe
}