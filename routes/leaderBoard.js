var express = require('express');
var router = express.Router();
var signUp = require('../controller/auth');
const { count } = require('../models/userModel');
var user = require('../models/userModel')

function getleaders(req,res,next){
    console.log(req.userRank)
    let leadingPLayers =[]
    let result ={}
     user.find({}).sort({points : -1}).limit(10).exec((err,user)=>{
            if(err){
                res.send(err)
            }
            else{
                user.forEach((ele,index)=>{
                    let player = {
                        username : ele.username,
                        points : ele.points,
                        rank : index+1
                    }
                    leadingPLayers.push(player)
                })
                
                if(req.userRank){
                    result.userRank = req.userRank
                }
                result.leadingPLayers=leadingPLayers
                res.send(result)
            }
        })
        
}
function CurrentUser(req,res,next){
    if(req.user){
        user.findOne({username : req.user.username},(err,currentUser)=>{
            if(err){
                res.send(err)
            }
                user.find({points : {$gt : currentUser.points}},(err,docs)=>{
                    req.docs = ""+docs.length+1+""
                    next()
                })
        })
    }
    else {
        next()
    }
}  

function getleaders(req,res,next){
    let leadingPLayers =[]
    user.find({}).sort({points : -1}).limit(10).exec((err,user)=>{
            if(err){
                res.send(err)
            }
            else{
                user.forEach((ele,index)=>{
                    let player = {
                        username : ele.username,
                        points : ele.points,
                        rank : index+1
                    }
                    leadingPLayers.push(player)
                })
                if(req.docs){
                    res.json({
                        yourRank : req.docs,
                        GlobalLeaders : leadingPLayers
                    })
                }
                else{
                    res.json({
                        GlobalLeaders : leadingPLayers
                    })

                }
            }
        })
}


router.get('/',signUp.leaderBoardAuth,CurrentUser,getleaders)

module.exports = router;