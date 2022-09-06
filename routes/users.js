const express = require('express');
const router = express.Router();
//require the passport
const passport = require('passport');
const usersController = require("../controllers/users_controller");
router.get('/profile/:id',passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.get('/sign-out', usersController.destroySession);
router.post('/create', usersController.create);
//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
), usersController.createSession);
module.exports = router;

