import { MongoClient } from "mongodb";
// connect DB
const url = "mongodb+srv://yousef20:XqGgJfewthGOWfK3@cluster0.wfxilmp.mongodb.net/";
const client = new MongoClient(url);
//check connection
const connectDB = ()=>{client.connect()
.then(()=>{console.log("DB connected successfully");})
.catch((err)=>{console.log("failed to connect to DB");})}
// create db
const db = client.db("carRental");
export{
    db,
    connectDB

}