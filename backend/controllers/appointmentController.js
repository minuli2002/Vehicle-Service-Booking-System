const Appointment = require("../models/Appointment");

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Private (Customer)
const createAppointment = async (req, res) => {
  try {
    const {
      customerName,
      contactNumber,
      vehicleNumber,
      serviceType,
      appointmentDate,
      preferredTime,
    } = req.body;

    if (
      !customerName ||
      !contactNumber ||
      !vehicleNumber ||
      !serviceType ||
      !appointmentDate ||
      !preferredTime
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!/^\d{10}$/.test(contactNumber)) {
      return res
        .status(400)
        .json({ message: "Contact number must be exactly 10 digits" });
    }

    const appointment = await Appointment.create({
      customer: req.user.id,
      customerName,
      contactNumber,
      vehicleNumber,
      serviceType,
      appointmentDate,
      preferredTime,
      status: "pending",
    });

    const populated = await Appointment.findById(appointment._id).populate(
      "serviceType",
      "title"
    );

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: populated,
    });
  } catch (error) {
    console.error("Create appointment error:", error);
    res.status(500).json({ message: "Server error creating appointment" });
  }
};

// @desc    Get appointments for logged-in customer
// @route   GET /api/appointments/my
// @access  Private (Customer)
const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ customer: req.user.id })
      .populate("serviceType", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({ message: "Server error fetching appointments" });
  }
};

// @desc    Get all appointments (admin)
// @route   GET /api/appointments
// @access  Private (Admin)
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("serviceType", "title")
      .populate("customer", "fullName email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({ message: "Server error fetching appointments" });
  }
};

// @desc    Get pending appointments (admin)
// @route   GET /api/appointments/pending
// @access  Private (Admin)
const getPendingAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ status: "pending" })
      .populate("serviceType", "title")
      .populate("customer", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({ message: "Server error fetching pending appointments" });
  }
};

// @desc    Get approved/in-progress/completed appointments (admin)
// @route   GET /api/appointments/active
// @access  Private (Admin)
const getActiveAppointments = async (req, res) => {
  try {
    const { date, status } = req.query;
    const query = { status: { $in: ["approved", "completed"] } };

    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      query.appointmentDate = { $gte: startOfDay, $lte: endOfDay };
    }

    if (status && ["approved", "completed"].includes(status)) {
      query.status = status;
    }

    const appointments = await Appointment.find(query)
      .populate("serviceType", "title")
      .populate("customer", "fullName email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({ message: "Server error fetching active appointments" });
  }
};

// @desc    Update appointment status
// @route   PATCH /api/appointments/:id/status
// @access  Private (Admin)
const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["pending", "approved", "rejected", "completed"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    const updated = await Appointment.findById(appointment._id)
      .populate("serviceType", "title")
      .populate("customer", "fullName email phone");

    res.status(200).json({
      message: `Appointment status updated to ${status}`,
      appointment: updated,
    });
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ message: "Server error updating appointment status" });
  }
};

// @desc    Get dashboard stats (admin)
// @route   GET /api/appointments/stats
// @access  Private (Admin)
const getDashboardStats = async (req, res) => {
  try {
    const pending = await Appointment.countDocuments({ status: "pending" });
    const approved = await Appointment.countDocuments({ status: "approved" });
    const completed = await Appointment.countDocuments({ status: "completed" });
    const total = await Appointment.countDocuments({
      status: { $in: ["approved", "completed"] },
    });

    res.status(200).json({ pending, totalBookings: total, completed });
  } catch (error) {
    res.status(500).json({ message: "Server error fetching stats" });
  }
};

module.exports = {
  createAppointment,
  getMyAppointments,
  getAllAppointments,
  getPendingAppointments,
  getActiveAppointments,
  updateAppointmentStatus,
  getDashboardStats,
};