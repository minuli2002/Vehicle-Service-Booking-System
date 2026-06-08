const Service = require("../models/Service");
const path = require("path");
const fs = require("fs");

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.status(200).json({ services });
  } catch (error) {
    res.status(500).json({ message: "Server error fetching services" });
  }
};

// @desc    Get single service by ID
// @route   GET /api/services/:id
// @access  Public
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ service });
  } catch (error) {
    res.status(500).json({ message: "Server error fetching service" });
  }
};

// @desc    Create a new service
// @route   POST /api/services
// @access  Private (Admin)
const createService = async (req, res) => {
  try {
    const { title, description, averageTime, basicCost } = req.body;

    if (!title || !description || !averageTime || !basicCost) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const service = await Service.create({
      title,
      description,
      averageTime,
      basicCost: parseFloat(basicCost),
      image: imageUrl,
    });

    res.status(201).json({ message: "Service created successfully", service });
  } catch (error) {
    console.error("Create service error:", error);
    res.status(500).json({ message: "Server error creating service" });
  }
};

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private (Admin)
const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const { title, description, averageTime, basicCost } = req.body;

    if (req.file) {
      // Delete old image if exists
      if (service.image) {
        const oldPath = path.join(__dirname, "..", service.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      service.image = `/uploads/${req.file.filename}`;
    }

    service.title = title || service.title;
    service.description = description || service.description;
    service.averageTime = averageTime || service.averageTime;
    service.basicCost = basicCost ? parseFloat(basicCost) : service.basicCost;

    const updated = await service.save();
    res.status(200).json({ message: "Service updated successfully", service: updated });
  } catch (error) {
    console.error("Update service error:", error);
    res.status(500).json({ message: "Server error updating service" });
  }
};

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private (Admin)
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Delete image file if exists
    if (service.image) {
      const imgPath = path.join(__dirname, "..", service.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await service.deleteOne();
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Delete service error:", error);
    res.status(500).json({ message: "Server error deleting service" });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};