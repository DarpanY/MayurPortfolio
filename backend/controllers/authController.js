const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
    const isProd = process.env.NODE_ENV === "production";

// ─── ADMIN LOGIN ───────────────────────────────────────────
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );


res.cookie("token", token, {
  httpOnly: true,
  secure: isProd,           // true in production (HTTPS)
  sameSite: isProd ? "none" : "lax"  // "none" required for cross-origin
});

    res.json({ success: true, token });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── SEED ADMIN (run once to create your admin account) ────
// POST /api/auth/seed
// Admin credentials:  email: mayur@gmail.com  |  password: MayurDhiman#2004
const seedAdmin = async (req, res) => {
  try {
    const existing = await Admin.findOne({ email: "mayur@gmail.com" });
    if (existing) {
      return res.json({ message: "Admin already exists" });
    }

    const hashed = await bcrypt.hash("MayurDhiman#2004", 10);
    await Admin.create({ email: "mayur@gmail.com", password: hashed });

    res.json({
      success: true,
      message: "✅ Admin account created!",
      credentials: {
        email: "mayur@gmail.com",
        password: "MayurDhiman#2004"
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { loginAdmin, seedAdmin };
