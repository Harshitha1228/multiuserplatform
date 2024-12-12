const Signup = require("../model/signup");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Secret = "shit@123";

const Signups = async(req,res)=> {
    const{username,email,password} = req.body;
    try{
        const sign = await Signup.findOne({email:email}); 
        const hashpassword = await bcrypt.hash(password,10)

        if(sign){
            res.status(400).json({message:"User already exists"})
        }else{
            const user = await Signup.create({
                username,
                email,
                password : hashpassword,
            })
            if(user){
                res.status(200).json({message:"User registered successfully"});
                console.log("Registration success");
            }else{
                res.status(400).json({message:"Error while registering"});
            }
        }

    } catch (error){
      console.log(error);
    }
};

const Logins = async(req,res)=>{
    const {email,password} = req.body;

    try{
        const log = await Signup.findOne({email:email});
        
        if(!log || !(await bcrypt.compare(password, log.password))){
                res.status(400).json({message:"Invalid email or password"});
            }
            else{
                const token = await jwt.sign({userId:log._id},Secret,{expiresIn:"30h"})

                res.status(200).json({message:"User login successful",token});
              
            }
    } catch(error) {
        console.log(error);
    }
};
module.exports = {Signups , Logins};
        
