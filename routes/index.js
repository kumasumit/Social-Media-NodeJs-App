const express = require('express');
const router = express.Router();
const homeController = require("../controllers/home_controller");
router.get("/", homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
//this will link the index of api folder with this router
router.use('/api', require('./api'));
module.exports = router;