const express = require('express')
const bcrypt = require('bcrypt');

const router = express.Router()

const User = require('../models/user')

router.post('/createUser' , async (req,res)=>{
    try{

    
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    let result = await User.findOne({where : {email : email}})
    console.log(result)
    if(result !== null)
        return res.status(401).json({success : false , msg : "User already exists"})
    let hash = await bcrypt.hash(password , 10);
    const user = await User.create({name : name , email : email , password : hash})
    
    const userWithoutPassword = user.toJSON();
    console.log(userWithoutPassword)
    delete userWithoutPassword.password;
    
    return res.json(userWithoutPassword);
    }catch(e){
        return res.status(500).json({msg : "Internal server error"})
    }
})



module.exports = router;