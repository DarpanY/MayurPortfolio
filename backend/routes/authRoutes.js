const express = require("express");
const router = express.Router();
const { loginAdmin, seedAdmin } = require("../controllers/authController");

// POST /api/auth/login
router.post("/login", loginAdmin);

// POST /api/auth/seed  ← run this ONCE in browser/Postman to create admin
router.post("/seed", seedAdmin);

module.exports = router;
