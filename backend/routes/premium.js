const express = require('express')
const Sequelize = require('sequelize')

const router = express.Router()

const auth = require('../middleware/auth')
const Expense = require('../models/expense')
const User = require('../models/user')


router.get('/showleaderboard', auth , async(req,res)=>{
    try{
        // return res.json(req.user)
        if(req.isPremiumUser){

        
        const result = await User.findAll({
            attributes :[
                'id',
                'name',
                [Sequelize.fn('COALESCE',Sequelize.literal('SUM(`expenses`.`expense`)'),0),'total'],
            ],
            include:[
                {
                    model : Expense,
                    attributes :[]
                }
            ],
            group : [`User.id`]
        })
        return res.json(result)
    }else{
        return res.status(403).json({success : false , msg :"you are not a premium user"})

    }
    }catch(e){
        console.log(e)
        return res.status(500).json({success : false , msg :"Internal server error"})
    }
})


module.exports = router;