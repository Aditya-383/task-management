
const taskService = require('../service/task.service.js');



const createTask = async (req, res) => {
    const taskData = req.body; 
  console.log("here",taskData)
    try {

      const task = await taskService.createTask(taskData);

        return res.status(201).json({ message: 'Task created successfully', task });

    } catch (err) {
      return res.status(500).json({ message: 'Task created failed'})
    }
}



const getTaskById= async(req,res)=>{

    const {taskId}=req.params;

     try{
        const task = await taskService.getTaskById(taskId);

        return res.status(201).json({ message: 'Task retrieve successfully', task });
     }
     catch(err){
        throw new Error("Task retrieve failed!");
     }
} 

const getAllTasks=async(req,res)=>{

    try{
        const tasks = await taskService.getAllTask();
           console.log(tasks)
        return res.status(201).json({ message: 'All Tasks retrieve successfully', tasks });
     }
     catch(err){
      return res.status(500).json({ message: 'failed'});
     }
    }
    

 const taskUpdateByUser = async (req, res) => {
   const  {taskId}  = req.params;   
   const {status} = req.body; 
    
    try {
        console.log("taskUpdateByUser",taskId,status)
       
        const updatedTask = await taskService.taskUpdateByUser({taskId, status});
    
        
        return res.status(200).json({message: 'Task status updated successfully',task: updatedTask  });
      } catch (err) {
        
        return res.status(500).json({
          message: 'Failed to update task status',
          error: err.message
        });
      }
}

const taskUpdateByAdmin = async (req, res) => {
  console.log("taskyupdatebyadmin")
  const  {taskId}  = req.params;   
  const taskData = req.body; 
   
   try {
       console.log("taskUpdateByUser",taskId,taskData)
      
       const updatedTask = await taskService.taskUpdateByAdmin({taskId, taskData});
   
       
       return res.status(200).json({message: 'Task status updated successfully',task: updatedTask  });
     } catch (err) {
       
       return res.status(500).json({
         message: 'Failed to update task status',
         error: err.message
       });
     }
}


const getTasksByProjectId = async (req, res) => {
  console.log("taskproject",req)
  try {
    
    // const { projectId } = req.params;
    const projectId="67f2504a4dc0ae7dbf599241";

    
    const tasks = await taskService.getTasksByProjectId(projectId);
  console.log("task",tasks)
   
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this project' });
    }

    
    return res.status(200).json({ message: 'Tasks retrieved successfully', tasks });
  } catch (err) {
    console.error("Error fetching tasks by projectId:", err.message);
    return res.status(500).json({ message: "Task retrieval failed!" });
  }
};


const deleteTask = async(req,res)=>{
    const { taskId} = req.params; 

    try {
      const task = await taskService.deleteTask(taskId);

      if (!task) {
        return res.status(404).json({ message: 'Task not found !' });
      }

      return res.status(200).json({ message: 'Task deleted successfully' });
      
    } catch (err) {
      return res.status(500).json({ message: 'Task not deleted' });
    }
}


//update

module.exports={createTask,getTaskById,getAllTasks,deleteTask,getTasksByProjectId,taskUpdateByUser,taskUpdateByAdmin};