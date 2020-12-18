var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    ObjectId = schema.ObjectId


var userSchema = new schema({
    ObjectId: ObjectId,
    date: {type: Date,default: () => new Date()},
    LastClaim :{type: Date,default: () => new Date()},
    username: {type:String, required:true, unique:true},
    points : {type:Number,default:()=> Math.floor(Math.random()*34)+145},
    count : {type : Number, default:0}
    })

module.exports = usermodel = mongoose.model('userModel' , userSchema);