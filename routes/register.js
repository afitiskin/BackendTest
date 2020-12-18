var express = require('express');
var router = express.Router();
var signUp = require('../controller/auth')



router.post('/',signUp.signup)

module.exports = router;
