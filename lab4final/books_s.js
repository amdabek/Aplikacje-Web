const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
app.use(bodyParser.json());

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "books.db",
});

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

const Book = sequelize.define("Book", {
  name: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  year: { type: DataTypes.INTEGER, allowNull: false },
});

sequelize.sync().then(() => console.log("Books database synced."));

app.get("/books", async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

app.get("/books/:id", async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

app.head("/books/:id", async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.status(200).end(); // Book exists
});

app.post("/books", authenticate, async (req, res) => {
  const { name, author, year } = req.body;

  try {
    const book = await Book.create({ name, author, year });
    res.status(201).json({ id: book.id });
  } catch (err) {
    res.status(500).json({ message: "Database error" });
  }
});

app.delete("/books/:id", authenticate, async (req, res) => {
  const result = await Book.destroy({ where: { id: req.params.id } });
  if (!result) return res.status(404).json({ message: "Book not found" });
  res.json({ message: "Book deleted" });
});

app.listen(3002, () => {
  console.log("Book Service is running on http://localhost:3002");
});
