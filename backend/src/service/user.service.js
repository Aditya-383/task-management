const User = require("../model/user.model");
const bcrypt=require("bcrypt");
const jwtProvider=require("../config/jwtProvder.js");



// "_id": "ObjectId",
// "fullName": "String",
// "email": "String",
// "password": "String", // Hashed for security
// "role": "String", // Example: "Admin", "User", 
//  "isActive": "Boolean", // To enable/disable user accounts
// "createdAt": "Date", 
// "updatedAt": "Date"

const createUser= async(req,res) =>{
   let {name, email,password, role, isActive} = req.body
    console.log("create user",req.body);
    try{
 
      const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            throw new Error("user already exist with email :", email)
        }
        
         password = await bcrypt.hash(password, 10);
          // console.log("password",pswd); 
      if(!name || !email || !password || !role){
        return res.status(400).json({message:"Please fill th form"});
      }
            
              const user = await User.create({name,email,password,role,isActive});
              console.log("register");

              return user; 

      }
      catch(err){
             throw new Error(err.message);
      } 
}

const findUserById = async(userId) => {
  try {
      const user = await User.findById(userId)
     
      if (!user) {
          throw new Error("user not found with id : ", userId)
      }
      //  console.log(user);
      return user;

  } catch (error) {
      throw new Error("User not found!")
  }
}


const getUserByEmail = async(email) =>{
   
    console.log("get data",email);
    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({message:"Student Not Found! Enter valid Email"});
        }
      
        console.log("user",user)
        return user;
    }
    catch(err){
      console.log("err.message:",err.message);
         throw new Error(err.message);
    }
}

const getUserByName = async(name) =>{
   
  console.log("get data",name);
  try{
      const user = await User.findOne({name});

      if(!user){
          return res.status(404).json({message:"Student Not Found! Enter valid Email"});
      }
    
      console.log("user",user)
      return user;
  }
  catch(err){
    console.log("err.message:",err.message);
       throw new Error(err.message);
  }
}

const getUserByToken=async(token)=>{
  try{
    const userId = jwtProvider.getUserIdFromToken(token);
    console.log("userId",userId);
      const  user= await findUserById(userId)
      if (!user) {
          throw new Error("user not found with id : ", userId)
      }

      return user;

  } catch(error){
      throw new Error(error.message)

  }
}

const deleteUser = async (_id) => {

  
    try {
      const user = await User.findOneAndDelete({ _id });
  
  
      console.log(" deleted:", user);
      return user;
    } catch (err) {
        throw new Error(err.message);
    } 
  }
 
  const updateUser = async (req, res) => {
    const { email } = req.query; 
    const { name, password} = req.body; 
    console.log(" email:", email);

    try {
      const values = {};
      if (name) {
        values.name = name;
    }
    if (password) {
        values.password = password;
    }
   

  console.log("values",values);
    if (Object.keys(values).length === 0) {
        return res.status(400).json({ message: "No valid values to update" });
    }
        const user = await User.findOneAndUpdate(
            { email },               
             values,   
            { new: true }           
        );

        
        if (!user) {
            return res.status(404).json({ message: "student not found with this email" });
        }

       
        console.log("updated:", user);
        return res.status(200).json({ message: "student data updated successfully", user });

    } catch (err) {
        console.error("Error update:", err.message);
    }
}

const getAllUser = async () => {
  try {
    const user = await User.find({ role: "User" }); 
    
    console.log("get all data",user);
    if (user.length === 0) {
      throw new Error("NO usera");
    }
       
      return user;
  } catch (err) {
      console.error("Error:", err.message);
  }
}

const updateUserById = async (userId, updatedData) => {
  try {
   
    const user = await User.findById(userId);
    
    if (!user) {
      throw new Error("User not found");
    }

    user.name = updatedData.name || user.name;
    user.email = updatedData.email || user.email;
    user.isActive = updatedData.isActive !== undefined ? updatedData.isActive : user.isActive;

    const updatedUser = await user.save();
    return updatedUser;
  } catch (err) {
    console.log("error:",err.message)
    throw new Error(err.message); 
}

}

module.exports = {createUser, getUserByEmail, deleteUser, updateUser,findUserById , getUserByName,getAllUser,getUserByToken,updateUserById};