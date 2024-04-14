var express = require('express');

var router = express.Router();

router.use('/users',require('./users'));
//auth
router.use('/auth',require('./auth'));
//message
router.use('/message',require('./message'));

module.exports = router;