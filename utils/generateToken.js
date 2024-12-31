const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  try {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: '15d', // Token expires in 15 days
    });
    return token;
  } catch (error) {
    console.error("Token generation error:", error);
    throw new Error("Failed to generate token");
  }
};

module.exports = generateToken;
