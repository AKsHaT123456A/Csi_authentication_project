const express = require("express");
const router = express();
const bodyParser = require("body-parser");
express.json({extended:true})
router.use(bodyParser.urlencoded({extended:true}));

const otpController = require("../controllers/otp");
const passController = require("../controllers/adminController");
const regController = require("../controllers/register");
const logController = require("../controllers/login");
const logoutController = require("../controllers/logout")
// const { json } = require("body-parser");
router.get("/otp",otpController.otpChecker);
router.get("/verify",otpController.sendVerifyMail);
router.get("/forget",passController.forgetVerify);
router.post("/login",logController)
router.post("/register",regController);
router.get("/logout",logoutController)
// router.post("/verify",);
module.exports = router;