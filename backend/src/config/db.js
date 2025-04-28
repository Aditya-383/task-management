const mongoose= require("mongoose");
const mondbUrl="mongodb+srv://adityasinha382003:iYYePeMlxXp8hOTy@cluster0.yjh2rau.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// const mondbUrl="mongodb+srv://adityasinha382003:eLQ85YKPDtEvejkq@cluster0.hyrsl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDb=()=>{
    console.log("mongodb-file")
    return mongoose.connect(mondbUrl);
}

module.exports={connectDb}    