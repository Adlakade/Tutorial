const express = require("express");
const path = require("path");
const cookie = require("cookie");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const userModel = require("./db.js");
const app = express();

const port = 9000;

app.use(express.static(path.join(__dirname, "frontend")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.post("/register", async (req, res) => {
  const {name,email,password} = req.body

  bcrypt.genSalt(10,(err,salt)=>{
    console.log(salt);
    bcrypt.hash(password,salt,async(err,hash)=>{
      console.log(hash)
      await userModel.create({
        name,
        email,
        password:hash
      })
    })
    const token = jwt.sign({email},"wjhfgwjfg")
    res.cookie("token",token)
    res.send("user created")
  })
});




app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("you are logged out");
});
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
