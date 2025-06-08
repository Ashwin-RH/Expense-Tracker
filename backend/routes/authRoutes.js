const express=require("express");
const { protect } =require("../middleware/authMiddleware");

const{
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authController");

const upload = require("../middleware/uploadMiddleware");

const router=express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/getUser",protect,getUserInfo);

router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Use BASE_URL from env if set, else fallback to current host
  const BASE_URL = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;

  const imageUrl = `${BASE_URL}/uploads/${req.file.filename}`;

  res.status(200).json({ imageUrl });
});


module.exports=router;
