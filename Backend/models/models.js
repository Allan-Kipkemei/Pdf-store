const mongoose = require('mongoose')


const userSchema =  new mongoose.Schema({
    name:String, 
    phoneNumber:Number,
    amount:Number


}, {
    timestamps:true,
})

module.exports= mongoose.model('UserData', userSchema)