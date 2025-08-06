require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { execFile } = require("child_process");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoute");
const autoTransactionRoute = require("./routes/autoTransactionRoute");
const transactions = require("./routes/transactions");

const app = express();

// Middleware to handle CORS
app.use(
  cors({
    origin: "*", // or allow your frontend ngrok URL
    methods: ["GET", "POST","PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// Basic test route
app.get("/", (req, res) => {
  res.send("StashUp Backend is running!");
});

app.use(express.json());

// MongoDB connection
connectDB();

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/auto-transaction", autoTransactionRoute);
app.use("/api/v1/transactions", transactions);



// Serve uploads folder statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---------------------
// File Upload + Extraction Route
// ---------------------
const upload = multer({ dest: "uploads/" });

app.post("/api/v1/analyze-upload", upload.single("file"), (req, res) => {
  const filePath = path.join(__dirname, req.file.path);

  execFile("python", ["extract.py", filePath], (error, stdout, stderr) => {
    fs.unlink(filePath, () => {}); // Delete uploaded file

    if (error) {
      console.error("Extraction Error:", error);
      return res.status(500).json({ error: "Failed to analyze file" });
    }

    try {
      const result = JSON.parse(stdout);
      res.json(result);
    } catch (parseErr) {
      console.error("Parse Error:", parseErr);
      res.status(500).json({ error: "Failed to parse extracted result" });
    }
  });
});





// Server Start
const PORT = process.env.PORT || 8000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT} and accessible via LAN`)
);

