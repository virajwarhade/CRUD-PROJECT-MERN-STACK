const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    Name:{
        type:String,
        required:false
    },
    
    Email:{
        type:String,
        required:false
    },

    Age:{
        type:Number,
        required:false
    }
})

const UserModel = mongoose.model("users",UserSchema)
module.exports = UserModel
