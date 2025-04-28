
const userService=require("../service/user.service.js");
const jwtProvider=require("../config/jwtProvder.js");
const bcrypt=require("bcrypt");

const register = async(req,res) =>{
     try{
        console.log("register");
          const user = await userService.createUser(req);
          const jwt=jwtProvider.generateToken(user._id);


          return res.status(200).send({jwt,message:"register success"})
     }
     catch(err){ 
           console.log(err.message) 
           return res.status(500).send({error:err.message});
     }
};


const login = async(req,res) =>{
    
  const {email,password,role} = req.body;
  console.log("login",req.body);
    try{ 
       
        const user = await userService.getUserByEmail(email);
         console.log("login-user",user);
        if(!user){
            return res.status(404).send({message:"User not found!",email});
        }
        console.log("login-user-2",user.role,"-",role);
        if(user.role !== role){
            return res.status(404).send({message:"Not valid role",email});
        }
        const validPassword= await bcrypt.compare(password,user.password)
        // console.log("yes",user,password,user.password,validPassword);
        
        if(!validPassword){   
            return res.status(401).send({message:"Invalid password"})
        } 
        
        
       
        const jwt=jwtProvider.generateToken(user._id);
        // console.log("yes");
        return res.status(200).send({jwt,user,message:"login success"});
    }
    catch(error){
        return res.status(500).send({error:"not found"});
    }
}


module.exports={register,login};