const mongo = require("mongoose");

const taskSchema = new mongo.Schema({
    taskName:{
        type:String,
        required:true,
    },
    taskDescription:{
        type:String,
        required:true,
    },
    taskStatus: {
        type: String,
        default: 'In Progress'
      },
      assignedTo: [{
        type: mongo.Schema.Types.ObjectId, ref: 'User',
      }],
      startDate:{
        type:Date,
        default:Date,
    },
    endDate:{
        type:Date,
        default:Date,
    },
    isDelete:{
        type:Boolean,
        default:false
    },
    projectId: {
        type: mongo.Schema.Types.ObjectId, ref: 'Project',
        // required: true
      },
    createdBy:{
        type: mongo.Schema.Types.ObjectId, ref: 'User'
    } 
})


const Task = mongo.model("Task",taskSchema);


module.exports=Task;