const express = require('express');
const router = express.Router();
const passport = require('passport');
//require the postsController to link the actions with the routes
const commentsController = require('../controllers/comments_controller');
router.post('/create', passport.checkAuthentication,commentsController.create);
router.get('/destroy/:id', passport.checkAuthentication,commentsController.destroy);
router.get('/destroyByPostOwner/:id', passport.checkAuthentication,commentsController.destroyByPostOwner);

module.exports = router;
