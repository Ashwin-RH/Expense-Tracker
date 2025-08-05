const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const Income = require("../models/Income");
const Expense = require("../models/Expense");

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const data = req.body;
  data.userId = req.user.id;

  try {
    const model = data.type === "Income" ? Income : Expense;
    const entry = new model(data);
    await entry.save();

    res.json({ message: "Transaction saved", data: entry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save transaction" });
  }
});

module.exports = router;
