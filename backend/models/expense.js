const mongodb=require('mongodb')

const {getDb } = require('../util/db')


class Expense{
    constructor(expense,description,category,userId){
        this.expense = expense;
        this.description = description;
        this.category = category;
        this.userId = new mongodb.ObjectId(userId);
    }

    save(){
        let db = getDb()
  
        return db.collection('expenses').insertOne(this)
        .then(exp => {
            console.log(exp)
            return exp
        }).catch(err => console.log(err))
    }

    static deleteById(id){
        
    }
}




// const Expense = sequelize.define('expense', {
//     id: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     expense: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
//     description: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     category: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     createdAt : {
//         type : Sequelize.DATEONLY,
//         defaultValue : Sequelize.NOW
//     }
// },
//     {
//         timestamps: false

//     })

module.exports = Expense;