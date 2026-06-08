const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "service-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

// GET /api/services - Public
router.get("/", getAllServices);

// GET /api/services/:id - Public
router.get("/:id", getServiceById);

// POST /api/services - Admin only
router.post("/", protect, adminOnly, upload.single("image"), createService);

// PUT /api/services/:id - Admin only
router.put("/:id", protect, adminOnly, upload.single("image"), updateService);

// DELETE /api/services/:id - Admin only
router.delete("/:id", protect, adminOnly, deleteService);

module.exports = router;