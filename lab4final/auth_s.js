const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
app.use(bodyParser.json());

const TEST_USER_ID = 1;
const SECRET_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMzNzQzNTA5LCJleHAiOjE3MzM3NDcxMDl9.ThKw_klSF0v3DgwXKMgAKYPwT218WdNlPRnmqCr3Wpw";
const CONSTANT_TOKEN = jwt.sign({ id: TEST_USER_ID }, SECRET_KEY, {
  noTimestamp: true,
});

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "auth.db",
});

const User = sequelize.define("User", {
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

sequelize.sync().then(() => console.log("Auth database synced."));

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json({ id: user.id });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Database error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id }, "SECRET_KEY", { expiresIn: "1h" });
  res.json({ token });
});

app.listen(3001, () => {
  console.log("Auth Service is running on http://localhost:3001");
});
