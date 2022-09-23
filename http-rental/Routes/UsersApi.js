const express = require("express");
const router = express.Router();
const { protect } = require("../Middleware/AuthMiddleware");

const {
  GetUser,
  UpdateUser,
  DeleteUser,
  LoginUser,
  RegisterUser,
  GetAllUsers,
  GetUserBookings,
  CreateUser
} = require("../Controllers/UserController");

router.get("/", protect, GetAllUsers);
router.post("/", protect, CreateUser);
router.get("/me", protect, GetUser);
router.put("/:id", protect, UpdateUser);
router.delete("/:id", protect, DeleteUser);
router.post("/login", LoginUser);
router.post("/register", RegisterUser);
router.get("/getUserStats", GetUserBookings);

module.exports = router;
