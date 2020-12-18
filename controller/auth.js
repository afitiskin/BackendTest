require('dotenv').config()

const user = require('../models/userModel')
const jwt = require('jsonwebtoken')


function signup(req,res,next){

    const User = new user({
        username: req.body.username
    })
      User.save((err)=>{
       if(err){
         if(err.name === "MongoError" && err.code === 11000){
           res.send("Please choose another UserName")
         }
         else{
          res.sendStatus(400)
         }
       }
       else{
        const accessToken = jwt.sign({username: req.body.username}, process.env.ACCESS_TOKEN_SECRET)
        res.json({accessToken : accessToken})  
       }             
     })
     
}

function leaderBoardAuth(req, res, next){
  const authHeader = req.headers.authorization;
  if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }

          req.user = user ;
          next();
      });
  } else {
     next()
  }
}


 function authenticateToken(req, res, next){
  const authHeader = req.headers.authorization;
  if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }

          req.user = user ;
          next();
      });
  } else {
      res.sendStatus(401);
  }
}

module.exports = {
    signup,authenticateToken,leaderBoardAuth
}
