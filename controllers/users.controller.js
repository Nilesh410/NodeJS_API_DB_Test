const UserModel = require("../models/users.model")
const bcrypt=require('bcrypt')

const UserController={
    home(request,response){
         response.json({message:"now home page is work"})
    },
    async getUser(request,response){
        try {
            let result=await UserModel.find()
            response.json({status:true,result})
        } catch (error) {
            response.json({status:false,message:"server error",error})
        }   
    },

    async addUser(request,response){
        let data=request.body
        try {
            let newpassword=await bcrypt.hash(data.password,10)
            let newUser=new UserModel({
                name:data.name,
                username:data.username,
                password:newpassword,
                mobileno:data.mobileno
            })
            let isUserExits=await UserModel.findOne({username:{$regex:data.username,$options:'i'}})
            if(isUserExits){
                response.json({status:false,message:`record with username ${data.username}is already present in the database`})
            }
            else{
            let result= await newUser.save();
            if(result)
            {
                response.json({status:true,message:"Registration done",data})
            }
            else{
                response.json({status:false,message:"Failed Registeration"})
            }
        }
        } catch (error) {
            response.json({status:false,message:"server error",error})
        }
    },
    async loginUser(request,response){
        let data=request.body
        try {

            let isUserExist= await UserModel.findOne({username:{$regex:"^"+data.username+"$",$options:"i"}})
            if(isUserExist)
            {
                let isPaswordValid=await bcrypt.compare(data.password,isUserExist.password)
                if(isPaswordValid)
                {
                    let userInfo={...isUserExist._doc}
                    delete userInfo.password
                    response.json({status:true,userData:userInfo})
                }
                else
                {
                    response.json({status:false,message:"Invalid Password"})
                }
            }
            else
            {
                response.json({status:false,message:"Invalid Username"})
            }
            
        } catch (error) {
            response.json({status:false,messge:"error",error})
        }
     
    }
}
module.exports=UserController