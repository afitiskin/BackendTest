var express = require('express');
var router = express.Router();
var signUp = require('../controller/auth')
var user = require('../models/userModel')


router.post('/play',signUp.authenticateToken, function(req, res, next) {
    let date = new Date()
    user.findOne({username: req.user.username},(err,docs)=>{
        if(err){
            res.send(err)
          }
        else{
                if(docs==null){
                  res.send("No such doc")
                }
                else{
                    let docdate = docs.date.getDate()
                    let currentPoints  = docs.points
                    let serverDate = date.getDate()
                    let pointsToBeAdded = Math.floor(Math.random()*99) +1
                    if(serverDate - docdate ==0 && docs.date.getHours() - date.getHours() == 0){
                        if(docs.count<5){
                            
                            user.updateOne({username: req.user.username},{date:date,$inc :{points:pointsToBeAdded , count: 1}},(err,docs)=>{
                                if(err) {
                                    console.log(err)
                                    return err
                                }
                                res.send({
                                    username: req.user.username,
                                    TotalPoints : currentPoints + pointsToBeAdded,
                                    PointsAdded : pointsToBeAdded
                                })
                            })
                        }
                        else if(docs.count>=5){
                            res.send("Cannot add more points to the table for more than 5 times in a hour")
                        }
                    }
                    
                    else{
                        user.updateOne({username: req.user.username},{count : 0,date:date, $inc : {points : pointsToBeAdded}},(err,docs)=>{
                            if(err){
                                console.log(err)
                                return err
                            }
                            console.log('updated')
                            res.send({
                                username: req.user.username,
                                TotalPoints : currentPoints + pointsToBeAdded,
                                PointsAdded : pointsToBeAdded
                            })
                        })
                    }

                }
        }
    })
});

router.post('/claim_bonus',signUp.authenticateToken,function(req, res, next) {
    let date = new Date()
    let pointsToBeAdded = 0
    user.findOne({username: req.user.username},(err,docs)=>{
        let totalPoints = docs.points
        //ifthe differnce between two claim is less than 10 mintues since each minute user get 10 points and max is 100
        if(docs.LastClaim.getDate()-date.getDate() == 0 && docs.LastClaim.getHours() - date.getHours() == 0 && Math.abs(date.getMinutes() - docs.LastClaim.getMinutes()) < 10){
             pointsToBeAdded = Math.abs(date.getMinutes() - docs.LastClaim.getMinutes()) * 10
             console.log(date.getMinutes() - docs.LastClaim.getMinutes())
        }
        else{
            pointsToBeAdded = 100
        }
        user.updateOne({username: req.user.username},{LastClaim:date, $inc : {points : pointsToBeAdded}},(err,docs)=>{
            if(err){
                res.send(err)
            }
            else{
                res.send({
                    username: req.user.username,
                    TotalPoints : totalPoints+ pointsToBeAdded,
                    PointsAdded : pointsToBeAdded
                })
            }
        })


    })
  });


module.exports = router;
