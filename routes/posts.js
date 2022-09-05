const express = require('express');
const router = express.Router();
const passport = require('passport');
//require the postsController to link the actions with the routes
const postsController = require('../controllers/posts_controller');
router.post('/create', passport.checkAuthentication,postsController.create);
module.exports = router;
