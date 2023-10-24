const express = require('express')

const router = express.Router()

const auth = require('../middleware/auth')
const paymentsController = require('../controller/purchase')



router.post('/purchasemembership' ,  auth,paymentsController.purchaseMembership)


router.post('/success' , auth , paymentsController.successfullTransaction)


router.post('/failed' , auth ,paymentsController.failedTransaction)


module.exports = router;