const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user')

const authenticate = async(req ,res ,next)=>{
    try{
        const token = req.headers['auth-token'];
        console.log("token")
        console.log(token)
        const data = jwt.verify(token , process.env.JWT_SECRET)
        console.log(data)
        const user = await User.findById(data.id)

        // return res.json({success : true})
        const newUser = new User(user.name,user.email,user.password,user.isPremiumUser,user.totalAmount,user._id)
        req.user = newUser;

        req.isPremiumUser = data.isPremiumUser;
        next()


    }catch(e){
        console.log(e)
        return res.status(500).json({success : false , msg : "Internal server error"})
    }
}

module.exports = authenticate;