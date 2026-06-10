const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const adminEmail = "admin@example.com";
const adminPassword = "admin123";

router.post("/", (req, res) => {
  const { email, password } = req.body;
  if (email === adminEmail && password === adminPassword) {
    const token = jwt.sign(
      { email, role: "admin" },
      process.env.JWT_SECRET || "omsvila_secret",
      { expiresIn: "7d" }
    );
    return res.json({ message: "Login successful", role: "admin", token });
  }
  res.status(401).json({ message: "Invalid credentials" });
});

module.exports = router;
