const Service    = require("../models/Service");
const cloudinary = require("../config/cloudinary");
const multer     = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith("video/");
    return {
      folder:          "mayur_portfolio/services",
      resource_type:   isVideo ? "video" : "image",
      allowed_formats: ["jpg","jpeg","png","webp","gif","mp4","mov","webm"],
    };
  },
});

const upload = multer({ storage });

const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createService = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!req.file) return res.status(400).json({ message: "Media file is required" });
    const isVideo   = req.file.mimetype.startsWith("video/");
    const mediaType = isVideo ? "video" : "image";
    const url       = req.file.path;
    const service   = await Service.create({
      title, description, mediaType,
      videoUrl: isVideo ? url : "",
      imageUrl: !isVideo ? url : "",
      works: [],
    });
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Not found" });
    const url     = service.videoUrl || service.imageUrl;
    const resType = service.mediaType === "video" ? "video" : "image";
    if (url) {
      const parts = url.split("/");
      const fn    = parts[parts.length - 1].split(".")[0];
      const fo    = parts[parts.length - 2];
      await cloudinary.uploader.destroy(`${fo}/${fn}`, { resource_type: resType });
    }
    for (const work of service.works || []) {
      try {
        const p  = work.url.split("/");
        const fn = p[p.length - 1].split(".")[0];
        const fo = p[p.length - 2];
        await cloudinary.uploader.destroy(`${fo}/${fn}`, {
          resource_type: work.mediaType === "video" ? "video" : "image",
        });
      } catch (_) {}
    }
    await service.deleteOne();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addWork = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Not found" });
    if (!req.file) return res.status(400).json({ message: "Media file is required" });
    const isVideo   = req.file.mimetype.startsWith("video/");
    const mediaType = isVideo ? "video" : "image";
    const url       = req.file.path;
    const title     = req.body.workTitle || "";
    service.works.push({ mediaType, url, title });
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteWork = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Not found" });
    const work = service.works.id(req.params.workId);
    if (!work) return res.status(404).json({ message: "Work not found" });
    try {
      const p  = work.url.split("/");
      const fn = p[p.length - 1].split(".")[0];
      const fo = p[p.length - 2];
      await cloudinary.uploader.destroy(`${fo}/${fn}`, {
        resource_type: work.mediaType === "video" ? "video" : "image",
      });
    } catch (_) {}
    work.deleteOne();
    await service.save();
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { upload, getServices, createService, deleteService, addWork, deleteWork };