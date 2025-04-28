const app = require('.');
const { connect } = require("mongoose");
const { connectDb } = require('./config/db');

const port = 5000;

app.listen(port, async()=>{
    console.log("connect")
    await connectDb();
    console.log("server is listing at:",port); 
})    