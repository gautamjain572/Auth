import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        select:false
    },
    googleId:{
        type:String
    }
},{ timestamps: true })

export const User = mongoose.models?.User || mongoose.model('User' , userSchema);
