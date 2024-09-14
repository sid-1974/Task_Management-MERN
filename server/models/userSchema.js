import mongoose  from "mongoose";
import validator from "validator";
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'

const  userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"please provide your name!"],
        minLength:[3,"Name must contain atleast 3 characters!"],
        mixLength:[30,"Name cannot exceed  30 characters!"],
    },
    email:{
        type:String,
        required:[true,"please provide your email!"],
        unique:[true,"user already registered"],
        validate:[validator.isEmail, "Please provide valid email "]

    },
    phone:{
        type:Number,
        required:[true,"please provide your phone Number"],

    },
    password:{
        type: String,
        required:[true,"please provide your password!"],
        minLength:[8,"Password must contain atleast 8 characters!"],
        mixLength:[32,"Password cannot exceed  32 characters!"],
        select:false,
    
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        },
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

userSchema.pre("save",async function () {
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//jwttokensssss function call
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRETE_KEY,{
        expiresIn:process.env.JWT_EXPIRES,
    })
}

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

export const User = mongoose.model("User",userSchema)