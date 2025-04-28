const userService=require("../service/user.service.js");

const jwtProvider=require("../config/jwtProvder.js");



const getUserByEmail=async(req,res)=>{
    try{
          const user = await userService.getUserByEmail(req);
          return res.status(200).send(user);
    }
    catch(err){
        throw new Error("User not found!");
    }
}

const getUserById=async(req,res)=>{
  
    try{
          const user = await userService.getUserById(req);
          return res.status(200).send(user);
    }
    catch(err){
      return res.status(500).send({error:"not found"});
    }
}

const getUserByName=async(req,res)=>{
  const name = req.params.name;
  console.log("name",req.params)
  try{
        const user = await userService.getUserByName(name);
        return res.status(200).send(user);
  }
  catch(err){
    return res.status(500).send({error:"not found"});
  }
}

const getUserByToken=async(req,res)=>{
    try{
        const jwt=req.headers.authorization?.split(" ")[1];
        console.log("header",jwt)
        if(!jwt){
            return res.status(404).send({error:"token not found"})
        } 
        
        const user = await userService.getUserByToken(jwt);
        console.log("yes");
        
            return res.status(200).send(user);
    } catch(error){
        return res.status(500).send({error:"can not get"})
    }
}

const  getAllUser=async(req,res)=>{
  console.log("all users controller")  
    try {
        const user=await userService.getAllUser();
        return res.status(200).send(user)
    } catch (err) {
      return res.status(500).send({error:"not found"});
    }
} 

const deleteUser = async (req, res) => {
    console.log("delete user",req.params)
    try {
      
      const userId = req.params.userId;

      const user = await userService.deleteUser(userId);
  
      if (!user) {
        return res.status(404).send({ message: "User not found!" });
      }
  
      return res.status(200).send({ message: "User deleted successfully", user });
    } catch (err) {
     
      console.error(err);
      return res.status(500).send({ message: "An error occurred while deleting the user." });
    }
  }

  const updateUserById = async (req, res) => {
    const userId  = req.params.userId; 
    const updatedData = req.body;   
   
    console.log("data",userId,updatedData)
    try {
      const updatedUser = await userService.updateUserById(userId, updatedData);
      
      return res.status(200).json({ message: "User updated successfully",user: updatedUser });
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ message: "Error updating user: "});
    }
  }
 

module.exports={getUserByEmail,getUserById,getAllUser,deleteUser,getUserByToken,updateUserById,getUserByName} 