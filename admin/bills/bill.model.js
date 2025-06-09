var mongoose=require('mongoose')
const Schema=mongoose.Schema
var Bill=new Schema({
    billid:{type:Number},
    billdate:{type:String},
    cid:{type:Number},
    pid:{type:Number},
    status:{type:String}
},{collections:"Bill"})

module.exports=mongoose.model("Bill",Bill)
