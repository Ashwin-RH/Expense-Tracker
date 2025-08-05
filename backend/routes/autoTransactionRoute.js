const express = require("express");
const multer = require("multer");
const { execFile } = require("child_process");
const path = require("path");
const fs = require("fs");
const { protect } = require("../middleware/authMiddleware");

const Income = require("../models/Income");
const Expense = require("../models/Expense");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // 🧠 .jpg/.png
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });


router.post(
  "/",
  protect,
  upload.single("billImage"),
  async (req, res) => {
    const filePath = path.join(__dirname, "../", req.file.path);

    // 🧠 DEBUG LOG — this shows exactly what file Python will read
    console.log("Uploaded File Path:", filePath); 

    console.log("Request file object:", req.file);


    execFile("python", ["extract.py", filePath], async (error, stdout, stderr) => {
      fs.unlink(filePath, () => {}); // Cleanup temp file

      if (error) {
        console.error("Python execution error:", error);
        console.error("stderr:", stderr);
        return res.status(500).json({ error: "Failed to analyze file" });
      }

      console.log("stdout from Python:", stdout);

      if (!stdout || stdout.trim() === "") {
        return res.status(500).json({ error: "No output from Python script" });
      }

      try {
        const result = JSON.parse(stdout);

        const transactionModel = result.type === "Income" ? Income : Expense;

        const transaction = new transactionModel({
          ...result,
          rawText: result.rawText, // Store the original text for reference
           userId: req.user.id, // Assuming you have user authentication middleware   
        });

        // await transaction.save();    // 🧠 Save the transaction to the database

        // res.json({      
        //   message: `${result.type} saved`,
        //   data: transaction,
        // });
        res.json({ message: "Scanned successfully", data: result });
      } catch (parseErr) {
        console.error("JSON Parse Error:", parseErr);
        res.status(500).json({ error: "Failed to parse result" });
      }
    });
  }
);

// ✅ Don't forget to export the router
module.exports = router;
