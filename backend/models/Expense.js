const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  icon: { type: String },
  category: { type: String, required: true }, // Example: Food, Rent, Groceries
  amount: { type: Number, required: true },
  rawText: { type: String }, // Store the original text for reference
  billDate: { type: Date }, 
  taxInfo: [
  {
    type: String,     // e.g., "CGST", "SGST", "Service Tax"
    rate: Number,     // e.g., 5.0
    amount: Number,   // e.g., 21.0
  }
],

  date: { type: Date, default: Date.now },
  description: { type: String }, // Optional description
  items: [
  {
    name: String,
    qty: Number,
    price: Number,
    amount: Number,
  }
],

}, { timestamps: true });

module.exports = mongoose.model("Expense", ExpenseSchema);
