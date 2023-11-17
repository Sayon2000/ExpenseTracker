const express = require('express')

const router = express.Router()

const auth = require('../middleware/auth')
const { Op ,literal} = require('sequelize')


router.post('/getdate', auth, async (req, res) => {
    try {
        const data = await req.user.getExpenses({where : {createdAt : req.body.date}})
        return res.json(data)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ success: false, msg: "Internal server error" })
    }
})


router.get('/getweekly' , auth , async(req,res)=>{
    try{
const currDate = new Date()
currDate.setDate(currDate.getDate() -7)
const result = await req.user.getExpenses({where : {
    createdAt : {
        [Op.gt] : currDate
    }
}})
return res.json(result)
    }catch(e){
        console.log(e)
        return res.status(500).json({ success: false, msg: "Internal server error" })
    }
})

router.post('/getMonthly' , auth , async(req,res)=>{
    try{
const month = req.body.month;
const startDate = new Date(month);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1);
const result = await req.user.getExpenses({where : {
    createdAt : {
        [Op.gte]: startDate,
        [Op.lt] : endDate                       

    }
}})
return res.json(result)
    }catch(e){
        console.log(e)
        return res.status(500).json({ success: false, msg: "Internal server error" })
    }
})


router.post('/getYearly' , auth , async(req,res)=>{
    try{
const year = req.body.year;
const startYear = new Date(year)
const endYear = new Date(startYear.getFullYear()+1 , 0 , 1)
const result = await req.user.getExpenses({
    attributes: [
      [literal('MONTH(createdAt)'), 'month'], 
      [literal('SUM(expense)'), 'totalAmount'], 
    ],
    where: {
      createdAt: {
        [Op.gte]: startYear,
        [Op.lt]: endYear,
      },
    },
    group: [literal('MONTH(createdAt)')], 
    raw: true, 
  });
return res.json(result)
    }catch(e){
        console.log(e)
        return res.status(500).json({ success: false, msg: "Internal server error" })
    }
})



module.exports = router;