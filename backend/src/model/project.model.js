const mongo = require("mongoose")

const projectSchema = new  mongo.Schema({
    projectTitle:{
        type:String,
       required:true,
    },
    description:{
        type:String,
        required:true,
    },
    startDate:{
        type:Date,
        default:Date.now,
    },
    assignedUser: [
        { type: mongo.Schema.Types.ObjectId, ref: 'User' }
      ],
    endDate:{
        type:Date,
        default:Date.now,
    },
    isDelete:{
        type:Boolean,
        default:false,
    },
    createdBy:{
         type: mongo.Schema.Types.ObjectId,
    }
})


const Project = mongo.model("Project",projectSchema);

module.exports=Project;