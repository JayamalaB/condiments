// controllers/cartController.js
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";


// Add item to cart
export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Check if product already exists in cart
      const existingProduct = cart.products.find(
        (p) => p.productId.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }

      await cart.save();
    } else {
      cart = new Cart({
        userId,
        products: [{ productId, quantity }],
      });
      await cart.save();
    }

    res.status(200).json({ message: "Item added to cart", cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user's cart
export const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove product from cart
export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.status(200).json({ message: "Item removed", cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
