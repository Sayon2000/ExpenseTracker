const express = require('express')
const router = express.Router();


const Expense = require('../models/expense')
const expense = require('../controller/expense')

router.get('/' , expense.getAll) //fetch all the expense 

router.post('/add-expense' , expense.addExpense) // add a new expense

router.delete('/deleteExpense/:id' , expense.deleteExpense) // delete a expense

router.post('/edit-expense/:id' , expense.editExpense)




module.exports = router;