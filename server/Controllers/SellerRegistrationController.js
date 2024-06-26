
const router = require("express").Router();
const{Seller}=require("../Models/seller");
const{BlockedSeller}=require("../Models/blockedseller")
const bcrypt=require("bcryptjs");
const { validate } = require("../Utils/sellerRegistrationValidation");


async function sellerRegistrationController (req, res){
    try{
       
        const{error}=validate(req.body);
        const url = req.file?.path
        if(error)
        {   
            return res.status(400).send({message:error.details[0].message});
        }
        const seller=await Seller.findOne({email:req.body.email});
        
        // console.log(req.body)
        if(seller){
            return res.status(409).send({message:"User with given email exist"})
        }

        const blocked=await BlockedSeller.findOne({email:req.body.email});

        if(blocked){
            return res.status(409).send({message:"User Blocked"})
        }

        const salt=await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword=await bcrypt.hash(req.body.password,salt);

        await new Seller({...req.body,password:hashPassword,img:url}).save();
        res.status(201).send({message:"User created Succesfully"})
    }catch(e){
        console.log(e)
        res.status(500).send({message:"internl server error"})
    }


}


module.exports = {sellerRegistrationController}