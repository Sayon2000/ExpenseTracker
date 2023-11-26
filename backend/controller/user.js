const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const AWS = require('aws-sdk')

exports.createUser = async (req,res)=>{
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
}


exports.login = async (req ,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({where : {email : email}})
        
 
        if(user === null){

            return res.status(401).json({success : false , msg : "wrong credentials"})
        }

        const result = await bcrypt.compare(password ,user.password)
        if(result){
            const token = jwt.sign({id : user.id, isPremiumUser : user.isPremiumUser} , process.env.JWT_SECRET)
            console.log(token)
            return res.json({success : true , token ,isPremiumUser : user.isPremiumUser })
        }else{
            return res.status(401).json({success : false , msg : "wrong credentials"})
        }


    }catch(e){
        return res.status(500).json({msg : "Internal server error"})

    }
}

exports.downloadExpenses = async(req,res)=>{
    try{
        const expenses = await req.user.getExpenses();
        const expensesToString = JSON.stringify(expenses)
        const fileName = `expense${req.user.id}/${new Date()}.txt`
        const fileUrl = await uploadToS3(expensesToString , fileName);
        return res.json({fileUrl  :fileUrl.Location , success : true})
    }catch(e){
        console.log(e)
        return res.status(500).json({success : false , msg : "Internal server error"})
    }
}

function uploadToS3(data , fileName){
    const s3Bucket = new AWS.S3({
        accessKeyId : process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey : process.env.AWS_SECRET_KEY
    })
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: data,
        ACL: 'public-read'
    };

    return new Promise((resolve , reject)=>{

    s3Bucket.upload(params, function(err, data) {
        if(err)
            reject("error")

        
         resolve(data)
      });
    })
    }