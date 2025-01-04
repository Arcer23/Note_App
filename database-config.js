import mongoose from "mongoose"

const link = "mongodb://127.0.0.1:27017/new"
mongoose.connect(link)
const database = mongoose.connection;
database.on("connected",()=>{
    console.log("database server connected")
})
database.on("disconnected",()=>{
    console.log("database server disconnected")
})
database.on("error",()=>{
    console.log("Error while connecting to the database server ")
})
export default database