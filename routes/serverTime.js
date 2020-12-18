var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
     let a = new Date().getTime()
     res.send({ServerTimeStamp : a})
});

module.exports = router;
