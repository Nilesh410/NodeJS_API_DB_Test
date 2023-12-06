const express=require('express')
const mongoose=require('mongoose')

const BasicRouter = require('./routes/basic.routes')
const server=express()

const port=3051
server.use(express.json())
server.use(express.urlencoded({extended:false}))

// server.get("/",(request,response)=>{
//     response.json("Now its work")
// })
server.use("/",BasicRouter)
//step-1) connect the db
let uri=`mongodb://127.0.0.1:27017/NSSDB2`
mongoose.connect(uri)
   .then(()=>{
           console.log("db connected")
           server.listen(port,()=>{
             console.log("server is working on port",port)
           })
   })
   .catch(()=>{
           process.exit(1) //stop the server
   })
//step-2) create a model