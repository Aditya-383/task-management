const  jwt = require("jsonwebtoken");

const SECRET_KEY = "ddhjhjdjdnkdnkdsqlwuhdwjdhloojoqednvadkwkfagy";


const generateToken=(userId)=>{
    const token=jwt.sign({userId},SECRET_KEY,{expiresIn:"48h"});
    return token;
}


const getUserIdFromToken=(token)=>{
    
    const verifiedToken=jwt.verify(token,SECRET_KEY);
    console.log("Verifiedtoken",verifiedToken)
    return verifiedToken.userId;
}

module.exports={generateToken,getUserIdFromToken}  