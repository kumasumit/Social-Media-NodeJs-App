const express = require('express');
const router = express.Router();
// this is root index for v1 route
router.use('/v1', require('./v1'));
// all the routes with api/v1 will go through the v1 folder
module.exports = router;