// routes/cartRoutes.js
// import express from "express";
// import {
//   addToCart,
//   getCart,
//   removeFromCart
// } from "../controllers/cartController.js";

// const router = express.Router();

// router.post("/add", addToCart); // POST /api/cart/add
// router.get("/:userId", getCart); // GET /api/cart/:userId
// router.delete("/remove", removeFromCart); // DELETE /api/cart/remove

// export default router;

const express = require("express");
const { addToCart, getCart, removeFromCart } = require("../controllers/cartController");

const router = express.Router();

router.post("/add", addToCart);
router.get("/:userId", getCart);
router.delete("/remove", removeFromCart);

module.exports = router; // ✅ CommonJS export

