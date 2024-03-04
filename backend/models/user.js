import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({

    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique: true

    },
    password : {
        type : String,
        required : true
    },
    isPremiumUser : {
        type:    Boolean,
        default : false
    },
    totalAmount : {
        type: Number,
        default : 0
    }
    
})

module.exports = mongoose.model('users' , userSchema);