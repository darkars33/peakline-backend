const User = require('../model/userAuth.schema');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');


const registerUser = async (req, res) => {
          try {
                    const { username, name, password } = req.body;

                    const isExistingUser = await User.findOne({ username });

                    if (isExistingUser) {
                              return res.status(400).json({ message: "User already exists" });
                    }

                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(password, salt);

                    const newUser = new User({
                              username,
                              name,
                              password: hashedPassword,
                    });

                    await newUser.save();

                    const token = generateToken(newUser._id);

                    res.cookie('token', token, {
                              httpOnly: true,
                              maxAge: 15 * 24 * 60 * 60 * 1000,
                              secure: process.env.NODE_ENV === 'production',
                    });

                    return res.status(201).json({
                              message: "User created successfully",
                              data: newUser,
                              success: true,
                              token,
                    });
          } catch (error) {
                    console.error("Error:", error);
                    return res.status(500).json({ message: error.message, success: false });
          }
};

const loginUser = async (req, res) => {
          try {
                    const { username, password } = req.body;

                    const user = await User.findOne({ username });

                    if (!user) {
                              return res.status(404).json({ message: "User not found" });
                    }

                    const isPasswordValid = await bcrypt.compare(password, user.password);

                    if (!isPasswordValid) {
                              return res.status(400).json({ message: "Invalid Password" });
                    }

                   const token = generateToken(user._id, res);

                    res.cookie('token', token, {
                              httpOnly: true,
                              maxAge: 15 * 24 * 60 * 60 * 1000,
                              secure: process.env.NODE_ENV === 'production',
                    })

                    return res.status(200).json({
                              message: "Login Successful",
                              data: user,
                              success: true,
                              token,
                    })

          } catch (error) {
                    console.log('error', error.message);
                    res.status(500).json({ message: error.message });
          }
}

const logoutUser = async (req, res) => {
          try {
                    res.clearCookie('token');
                    return res.status(200).json({ message: "Logout Successful" });
          } catch (error) {
                    console.log('error', error.message);
                    res.status(500).json({ message: error.message });
          }
}

module.exports = { registerUser, loginUser, logoutUser };