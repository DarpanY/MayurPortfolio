require("dotenv").config();

const express      = require("express");
const cors         = require("cors");
const cookieParser = require("cookie-parser");

const connectDB      = require("./config/db");
const authRoutes     = require("./routes/authRoutes");
const contactRoutes  = require("./routes/contactRoutes");
const serviceRoutes  = require("./routes/serviceRoutes");
const allowedOrigins = [
  "http://localhost:5173",
  "https://mayurportfolio.onrender.com",
  "https://metthu-daanportfolio.netlify.app"  // your Netlify URL
];
const app = express();
connectDB();

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",    authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/services", serviceRoutes);

app.get("/", (req, res) => res.send("Portfolio API Running ✅"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
