const express = require("express");
const router = express.Router();

const {
  showUsers,
  createUser,
  userLogin,
  suspender,
  validateUser,
} = require("../controllers/userController");
const { authorize, needsAdmin } = require("../middlewares/auth");
const local = require("../routes/auth/local");

// Login & Register
router.use("/users", local);
//router.post("/users/register", createUser);

//Operaciones "Admin" sobre Usuarios
//router.get("/admin/users/:userid?", authorize, needsAdmin, showUsers);
//router.put("/admin/users/:userid/suspend", authorize, needsAdmin, suspender);

module.exports = router;
