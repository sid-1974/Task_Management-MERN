import mongoose from 'mongoose'

export const dbConnection = () =>{
    mongoose.connect(process.env.MONGO_URI,{
        dbname : "MERN_STACK_TASK_MANAGEMENT"
    }).then(()=>{
        console.log("connected to database!")
    }).catch(err =>{
        console.log(`some error occured while connecting to database :${err}`)
    })
}