const mongoose = require("mongoose");

const workSchema = new mongoose.Schema({
  mediaType: { type: String, enum: ["video","image"], default: "image" },
  url:       { type: String, required: true },
  title:     { type: String, default: "" },
}, { _id: true });

const serviceSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  mediaType:   { type: String, enum: ["video", "image"], default: "video" },
  videoUrl:    { type: String, default: "" },
  imageUrl:    { type: String, default: "" },
  works:       { type: [workSchema], default: [] }
}, { timestamps: true });

module.exports = mongoose.model("Service", serviceSchema);