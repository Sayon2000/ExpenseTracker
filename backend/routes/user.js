const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.post('/createUser' , async (req,res)=>{
    const name = req.body.name;
    console.log(name)


    return res.json(name)
})



module.exports = router;