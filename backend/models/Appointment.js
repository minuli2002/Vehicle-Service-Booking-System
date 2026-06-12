const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Contact number must be exactly 10 digits"],
    },
    vehicleNumber: {
      type: String,
      required: true,
      trim: true,
    },
    serviceType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    preferredTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending",
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);