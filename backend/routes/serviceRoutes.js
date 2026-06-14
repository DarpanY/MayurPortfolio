const express = require("express");
const router  = express.Router();
const protect = require("../middleware/authMiddleware");
const { upload, getServices, createService, deleteService, addWork, deleteWork, updateThumbnail } =
  require("../controllers/serviceController");

router.get("/",                      getServices);
router.post("/",                     protect, upload.single("media"), createService);
router.delete("/:id",                protect, deleteService);
router.patch("/:id/thumbnail",       protect, upload.single("media"), updateThumbnail);
router.post("/:id/works",            protect, upload.single("media"), addWork);
router.delete("/:id/works/:workId",  protect, deleteWork);

module.exports = router;