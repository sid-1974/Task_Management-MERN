import mongoose from "mongoose";

const taskschema =  new mongoose.Schema({
    title:{
        type:String,

    },
    description:{
        type:String
    },
    status:{
        type:String,
        enum:["completed","incomplete"]
    },
    archived:{
        type:Boolean,
        default:false
    },
    createBy:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export const  Task= mongoose.model("Task",taskschema)