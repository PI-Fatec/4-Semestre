const express = require("express");
const { registerUser } = require("../controllers/authController");
const { loginUser } = require("../controllers/loginController");
const authMiddleware = require("./middleware/authMiddleware");
const { updateUser } = require("../controllers/alteruserCOntroller");
const router = express.Router();

router.post("/register", registerUser);
router.post('/login', loginUser);
router.patch('/update', authMiddleware, updateUser);

module.exports = router;
