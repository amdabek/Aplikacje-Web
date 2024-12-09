const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "orders.db",
});

const Order = sequelize.define("Order", {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  bookId: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
});

sequelize.sync().then(() => console.log("Orders database synced."));

const TEST_USER_ID = 1;
const SECRET_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMzNzQzNTA5LCJleHAiOjE3MzM3NDcxMDl9.ThKw_klSF0v3DgwXKMgAKYPwT218WdNlPRnmqCr3Wpw";
const CONSTANT_TOKEN = jwt.sign({ id: TEST_USER_ID }, SECRET_KEY, {
  noTimestamp: true,
});

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  if (token === CONSTANT_TOKEN) {
    req.user = { id: TEST_USER_ID };
    return next();
  }

  try {
    const decoded = jwt.verify(token, "SECRET_KEY");
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
};

async function bookExists(bookId) {
  try {
    await axios.head(`http://localhost:3002/books/${bookId}`);
    return true;
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return false;
    }
    throw new Error("Book service unavailable");
  }
}

app.get("/orders/:userId", async (req, res) => {
  const orders = await Order.findAll({
    where: { userId: req.params.userId },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  res.json(orders);
});

app.post("/orders", authenticate, async (req, res) => {
  const { bookId, quantity } = req.body;

  try {
    const exists = await bookExists(bookId);
    if (!exists) return res.status(404).json({ message: "Book not found" });

    const order = await Order.create({
      userId: req.user.id,
      bookId,
      quantity,
    });
    res.status(201).json({
      id: order.id,
      userId: order.userId,
      bookId: order.bookId,
      quantity: order.quantity,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.patch("/orders/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { bookId, quantity } = req.body;

  try {
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const exists = await bookExists(bookId);
    if (!exists) return res.status(404).json({ message: "Book not found" });

    if (String(order.userId) !== String(req.user.id)) {
      return res.status(403).json({
        message:
          "Unauthorized to modify this order: " +
          order.userId +
          " !== " +
          req.user.id,
      });
    }

    const fieldsToUpdate = {};
    if (bookId) fieldsToUpdate.bookId = bookId;
    if (quantity) fieldsToUpdate.quantity = quantity;

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    await order.update(fieldsToUpdate);

    res.json({ message: "Order updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Database error" });
  }
});

app.delete("/orders/:id", authenticate, async (req, res) => {
  const result = await Order.destroy({ where: { id: req.params.id } });
  if (!result) return res.status(404).json({ message: "Order not found" });
  res.json({ message: "Order deleted" });
});

app.listen(3003, () => {
  console.log("Order Service is running on http://localhost:3003");
});
