const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


exports.createUser = async (req, res) => {
    console.log('user creating')
    let hash = await bcrypt.hash(req.body.password , 10);

    const newUser = new User(req.body.name, req.body.email,hash, false, 0)
    newUser.save()
    return res.json({ success: true })



    // try{


    // const name = req.body.name;
    // const email = req.body.email;
    // const password = req.body.password;
    // let result = await User.findOne({where : {email : email}})
    // console.log(result)
    // if(result !== null)
    //     return res.status(401).json({success : false , msg : "User already exists"})
    // let hash = await bcrypt.hash(password , 10);
    // const user = await User.create({name : name , email : email , password : hash})

    // const userWithoutPassword = user.toJSON();
    // console.log(userWithoutPassword)
    // delete userWithoutPassword.password;

    // return res.json(userWithoutPassword);
    // }catch(e){
    //     return res.status(500).json({msg : "Internal server error"})
    // }
}


exports.login = async (req, res) => {

    


    try {
        const email = req.body.email;
        const password = req.body.password;
        console.log(email)
        const user = await User.findOne({ email: email })
console.log(user)

        if (user === null) {

            return res.status(401).json({ success: false, msg: "wrong credentials" })
        }

        const result = await bcrypt.compare(password, user.password)
        if (result) {
            console.log(user._id)
            const token = jwt.sign({ id: user.id, isPremiumUser: user.isPremiumUser }, process.env.JWT_SECRET)
            console.log(token)
            return res.json({ success: true, token, isPremiumUser: user.isPremiumUser })
        } else {
            return res.status(401).json({ success: false, msg: "wrong credentials" })
        }


    } catch (e) {
        return res.status(500).json({ msg: "Internal server error" })

    }
}


