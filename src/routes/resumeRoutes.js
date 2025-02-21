const express = require("express");
const {
  analyzeResume,
  searchResume,
} = require("../controllers/resumeController");
const authenticateJWT = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/analyze", authenticateJWT, analyzeResume);
router.get("/search", authenticateJWT, searchResume);

module.exports = router;
