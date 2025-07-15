const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/cookie")
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });


 const userSchema =  new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    
  })


  const userModel  = mongoose.model("user",userSchema)

  module.exports = userModel