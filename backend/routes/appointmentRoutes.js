const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getMyAppointments,
  getAllAppointments,
  getPendingAppointments,
  getActiveAppointments,
  updateAppointmentStatus,
  getDashboardStats,
} = require("../controllers/appointmentController");
const { protect, adminOnly, customerOnly } = require("../middleware/authMiddleware");

// GET /api/appointments/stats - Admin dashboard stats
router.get("/stats", protect, adminOnly, getDashboardStats);

// GET /api/appointments/my - Customer's own appointments
router.get("/my", protect, customerOnly, getMyAppointments);

// GET /api/appointments/pending - Admin: pending appointments
router.get("/pending", protect, adminOnly, getPendingAppointments);

// GET /api/appointments/active - Admin: approved/completed appointments (with filter)
router.get("/active", protect, adminOnly, getActiveAppointments);

// GET /api/appointments - Admin: all appointments
router.get("/", protect, adminOnly, getAllAppointments);

// POST /api/appointments - Customer: create booking
router.post("/", protect, customerOnly, createAppointment);

// PATCH /api/appointments/:id/status - Admin: update status
router.patch("/:id/status", protect, adminOnly, updateAppointmentStatus);

module.exports = router;