const express = require("express");
const router = express.Router();


const userController= require("../controllers/userControllers.js");

router.post("/user/register", userController.createUser);
router.post("/user/login", userController.userLogin);
router.get("/user/details/:id", userController.getUser);

module.exports = router;
