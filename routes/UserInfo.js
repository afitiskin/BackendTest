var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var signUp = require('../controller/auth')
var user = require('../models/userModel')

router.get('/',signUp.authenticateToken,function(req, res, next) {
  
  user.findOne({username: req.user.username},(err,docs)=>{
    if(err){
      res.send(err)
    }
    else{
      if(docs==null){
        res.send("No doc found")
      }
      else{
        res.json({
          username: docs.username,
         point :docs.points
        })
      }
      
    }
  })
  
});

module.exports = router;
