const express = require("express");
const user_route = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

user_route.post("/register", async(req, res)=>{
  try{
    const existingUser = await UserModel.findOne({email:req.body.email})
    if(existingUser){
      res.status(409).json({
        status:"failed",
        message:"user already exist"
      })
    }else{
      bcrypt.hash(req.body.password, 10, async function (err, hash) {
        if (!err) {
          try {
            const user = await UserModel.create({
              name:req.body.name,
              email: req.body.email,
              password: hash,
            });
            res.json({
              status: "success",
              user,
            });
          } catch (e) {
            res.status(401).json({
              status: "failed",
              message: e.message,
            });
          }
        }
      });
    }
  }catch(e){
    res.status(401).json({
      status: "failed",
      message: e.message,
    });
  }
})
user_route.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    console.log(user.name);
    if (user) {
      let result = bcrypt.compare(req.body.password, user.password);
      if (result) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: user.name,
          },
          "secret"
        );
        res.status(200).json({
          status: "ok",
          token,
        });
      } else {
        res.status(404).json({
          status: "failed",
          message: "password does not match",
        });
      }
    } else {
      res.status(404).json({
        status: "failed",
        message: "user does not available",
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
  }
});
module.exports = user_route;
