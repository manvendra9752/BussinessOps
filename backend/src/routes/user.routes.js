const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deactivateUser,
} = require("../controllers/user.controller");
const { protect } = require("../middlewares/auth");
const authorize = require("../middlewares/roles");

const router = express.Router();

router.get("/", protect, authorize("ADMIN", "MANAGER"), getUsers);
router.get("/:id", protect, getUserById);
router.post("/", protect, authorize("ADMIN"), createUser);
router.put("/:id", protect, authorize("ADMIN"), updateUser);
router.patch("/:id/deactivate", protect, authorize("ADMIN"), deactivateUser);

module.exports = router;
