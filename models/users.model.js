//step-i) import mongoose
const mongoose=require('mongoose')

//step-ii) create a schema
const UserSchema=new mongoose.Schema(
        {
            "name": { type:String },
            "username": {type:String},
            "password": {type:String},
            "mobileno":{type:String}
          }   
)
//step-iii)
const UserModel=mongoose.model("userdata",UserSchema,"userData")
module.exports=UserModel