const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { createAuditLog } = require("../services/audit.service");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await createAuditLog({
      actorUserId: req.user._id,
      action: "USER_CREATED",
      entityType: "USER",
      entityId: user._id,
      metadata: { role: user.role },
    });

    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent non-admin from changing roles
    if (req.body.role && req.user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Only admins can change user roles",
      });
    }

    // Prevent self role elevation
    if (
      req.body.role &&
      req.user._id.toString() === req.params.id &&
      req.body.role !== req.user.role
    ) {
      return res.status(403).json({
        success: false,
        message: "Cannot change your own role",
      });
    }

    const { name, email, role } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (role && req.user.role === "ADMIN") user.role = role;

    await user.save();

    await createAuditLog({
      actorUserId: req.user._id,
      action: "USER_UPDATED",
      entityType: "USER",
      entityId: user._id,
    });

    res.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deactivateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isActive = false;
    await user.save();

    await createAuditLog({
      actorUserId: req.user._id,
      action: "USER_DEACTIVATED",
      entityType: "USER",
      entityId: user._id,
    });

    res.json({
      success: true,
      message: "User deactivated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deactivateUser,
};
