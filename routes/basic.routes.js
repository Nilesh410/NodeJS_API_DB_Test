const UserController = require('../controllers/users.controller')

const BasicRouter=require('express').Router()

BasicRouter.get("/",UserController.home)

BasicRouter.get("/get-user",UserController.getUser)

BasicRouter.post("/add-user",UserController.addUser)

BasicRouter.post("/login-user",UserController.loginUser)

module.exports=BasicRouter