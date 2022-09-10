
const express = require('express');
const router = express.Router();

router.use('/posts', require('./posts'));
// any routes with api/v1/posts will go through posts inside v1
module.exports = router;