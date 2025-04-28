const express = require("express");
const { register, getData, deleteData, updateData, getAllStudent } = require("./service/user.service");
const cors=require("cors");

const app = express();

app.use(express.json());
app.use(cors()); 

app.get("/",(req,res)=>{
    return res.status(200).send({message:"welcome ",status:true})
})



const authRouter=require("./route/auth.route.js");
app.use("/api/auth",authRouter);

const userRouter = require("./route/user.route.js"); 
app.use("/api/user",userRouter);

const projectRouter = require("./route/project.route.js");
app.use("/api/project",projectRouter);

const taskRouter =require("./route/task.route.js");
app.use("/api/task",taskRouter)

module.exports=app;