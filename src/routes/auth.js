const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');

router.post("/insert", authController.insert);

module.exports = router;