
const jwtProvider=require("../config/jwtProvder.js");
const userService=require("../service/user.service.js");


const userAuthenticate=async(req,res,next)=>{
    try {
        console.log("hii1;")
        const token=req.headers.authorization?.split(" ")[1];
       
        if(!token){
            return res.status(404).send({error:"token not found!"})
        }

        const userId=jwtProvider.getUserIdFromToken(token);
        const user= await userService.findUserById(userId);

          if(user.role !== "User"){
            return res.status(500).send({error:"You are not valid User!"})
          }
        req.user=user;
        // console.log(user)
    } catch (error) {
        return res.status(500).send({error:"authenticatot"});
    }

    next();
}

const adminAuthenticate=async(req,res,next)=>{
   
    try {
        console.log("adminAuthenticate")
        const token=req.headers.authorization?.split(" ")[1];
       
        if(!token){
            return res.status(404).send({error:"token not found!"})
        }

        const userId=jwtProvider.getUserIdFromToken(token);
        const user= await userService.findUserById(userId);

          if(user.role !== "Admin"){
            return res.status(500).send({error:"You are not valid User!"})
          }
        req.user=user;
        req.userId=userId;
        // console.log("req.user",req.user)
    } catch (error) {
        return res.status(500).send({error:"authenticatot",error});
    }

    next();
}
module.exports={userAuthenticate,adminAuthenticate};