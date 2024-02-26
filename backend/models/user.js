const mongodb=require('mongodb')

const {getDb } = require('../util/db')

    class User{
    constructor(name,email,password,isPremiumUser,totalAmount,id){
        this.name = name;
        this.email = email;
        this.password = password;
        this.isPremiumUser = isPremiumUser;
        this.totalAmount = totalAmount;
        this._id = id?new mongodb.ObjectId(id) : null;
    }

    save(){
        let db = getDb()
        console.log(this)
        return db.collection('users').insertOne(this)
        .then(user => {
            console.log(user)
            return user
        }).catch(err => console.log(err))
    }
    static findById(id){
        let db = getDb()
        return db.collection('users').findOne({_id : new mongodb.ObjectId(id)})
        .then(user => {
            console.log(user)
            return user
        }).catch(err => console.log(err))
    }

    static findOne(obj){
        let db = getDb()
        return db.collection('users').findOne(obj)
        .then(user => {
            console.log(user)
            return user
        }).catch(err => console.log(err))
    }
}





// const User = sequelize.define('user', {
//     id : {
//         type : Sequelize.INTEGER,
//         allowNull  : false,
//         primaryKey : true,
//         autoIncrement : true
//     },
//     name : {
//         type : Sequelize.STRING,
//         allowNull : false
//     },
//     email : {
//         type : Sequelize.STRING,
//         allowNull : false,
//         unique: true

//     },
//     password : {
//         type : Sequelize.STRING,
//         allowNull : false
//     },
//     isPremiumUser : {
//         type:    Sequelize.BOOLEAN,
//         defaultValue : false
//     },
//     totalAmount : {
//         type: Sequelize.INTEGER,
//         defaultValue : 0
//     }
    
// })

module.exports = User;