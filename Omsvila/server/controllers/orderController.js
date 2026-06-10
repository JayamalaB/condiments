const Order = require("../models/Order");

const placeOrder = async (req, res) => {
  const { userId, customerName, products, shippingAddress, totalAmount } = req.body;
  try {
    const newOrder = new Order({ userId, customerName, products, shippingAddress, totalAmount });
    const saved = await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserOrders = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  try {
    const updated = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    res.status(200).json({ message: "Order status updated", order: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { placeOrder, getUserOrders, getAllOrders, updateOrderStatus };
