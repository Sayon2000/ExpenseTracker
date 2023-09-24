const Expense = require('../models/expense')

exports.getAll = (req,res)=>{
    Expense.findAll({raw : true ,
         attributes :["id" , "expense" ,"category" , "description"]})
         .then(data =>{
        return res.json({data})
    })
    .catch(e =>{
        console.log(e)
        return res.status(500).json({msg : "Internal server error"})
    })
}

exports.addExpense = (req,res)=>{
    const expense = req.body.expense;
    const description = req.body.description;
    const category = req.body.category;

    Expense.create({
        expense : expense,
        description : description,
        category : category
    }).then((data)=>{
        return res.json({data})
    })
    .catch(e =>{
        console.log(e)
        return res.status(403).json({success : false})
    })
}

exports.deleteExpense = (req,res)=>{
    const id = req.params.id;
    Expense.findByPk(id).then(expense =>{
        return expense.destroy()
    }).then(()=>{
        return res.status(200).json({success : true , msg : "deleted successfully"})
    }).catch(e =>{
        console.log(e)
        return res.status(401).json({success : false })
    })
}

exports.editExpense = (req,res)=>{
    const id = req.params.id;
    Expense.findByPk(id).then(data =>{
        data.expense = req.body.expense,
        data.description = req.body.description,
        data.category = req.body.category
        return data.save()
    }).then(() =>{
        return res.json({success : true})
    }).catch(e =>{
        console.log(e)
        return res.status(403).json({success : false})
    })
}