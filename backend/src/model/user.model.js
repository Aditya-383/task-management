
const mongo = require('mongoose')


const userSchema = new mongo.Schema({
    name: {
        type: String,
        required: [true, "Name Is Required!"],
      },
      email: {
        type: String,
        required: [true, "Email Is Required!"],
      },
      password: {
        type: String,
        required: [true, "Password Is Required!"],
      },
      role: {
        type: String,
        required: [true, "User Role Required!"],
        enum: ["User", "Admin"],
      },
      isActive:{
        type:Boolean,
        default:true
        
      },
      createdAt:{
      type:Date,
      default:Date.now,
      },
      updatedAt:{
        type:Date,
        default:Date.now,
      } 

})


const User =  mongo.model("User",userSchema);

module.exports = User;