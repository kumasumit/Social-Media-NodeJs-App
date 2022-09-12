const express = require('express');
const router = express.Router();
const passport = require('passport');
const postsApi = require("../../../controllers/api/v1/posts_api");
router.get("/",postsApi.index);
router.delete("/:id", passport.authenticate('jwt', {session: false}),postsApi.destroy)
//here we have done session false to prevent session cookies from being generated for the jwt tokens
module.exports = router;