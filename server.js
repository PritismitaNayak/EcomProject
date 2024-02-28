/**
 * This will be the starting file of the project
 */
const express = require("express")
const mongoose =require("mongoose")
const app =express()
const server_config =require("./configs/server.config")
const db_config =require("./configs/db.config")
const user_model =require("./models/user.model")
const bcrypt =require("bcryptjs")

/**
 * create an admin user at the starting of the application
 * if not not already present
 */

//connection with mongodb
mongoose.connect(db_config.DB_URL)
const db =mongoose.connection
db.on("error", () =>{
  console.log("Error while connecting to the nongoDB")
})

db.once("open", ()=>{
  console.log("Connected to mongoDB")
  init()
})

async function init(){
  try{
    let user = await user_model.findOne({userId : "admin"})
    if(user){
      console.log("Admin is already present")
      return
    }
  }
  catch(err){
    console.log("Error while reading the data", err)
    }
  
  

 try{
  user =await user_model.create({
    name : "Pritismita",
    userId : "admin",
    email : "nayakpritismita123@gmail.com",
    userType : "ADMIN",
    password : bcrypt.hashSync("welcome1", 8) //8 means minimum 8 character
  })
  console.log("Admin created ", user)
 }catch(err){
  console.log("error while create admin", err)
 }

}
/**
 * start the server
 */
app.listen(server_config.PORT, ()=>{
  console.log("Server started at port num:",server_config.PORT)
})