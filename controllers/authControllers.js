// controllers/authControllers.js

const userModel = require("../models/userModel"); // Import the userModel
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const { registerSchema } = require("../schema/registerSchema");

const registerController = async (req, res) => {
  try {
    // validate the input using zod
    const parsedData = registerSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parsedData.error.flatten(),
      });
    }

    // console.log(parsedData.data);

    const { userName, email, password, phone, address } = parsedData.data;
    // Validation
    if (!userName || !email || !password || !phone || !address) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    // Check if user already exists
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email already registered. Please login.",
      });
    }
    //hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      phone,
      address,
    });
    res.status(201).send({
      success: true,
      message: "Successfully registered",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

//LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Email or Password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    //check user password | compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid credentails",
      });
    }
    //token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

module.exports = { registerController, loginController };
