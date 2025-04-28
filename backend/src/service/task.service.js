const Task = require("../model/task.model");





const createTask= async(taskData)=>{

    
   try{
    console.log("create task",taskData)
    const task = new Task(taskData);

     await task.save();

     return task;
    }
    catch(err){
        console.log("errpr:",err.message)
       throw new Error("task has not created!"); 
    }
} 

 
const getTaskById = async(taskId) =>{
    try{
    const task = await Task.find({taskId}).populate('user');

    return task;
    }
    catch(err){
       throw new Error("task not found!");
    }
}

const getAllTask = async()=>{
    try{
      console.log("task")
        const tasks = await Task.find().populate('assignedTo','name');
        return  tasks;
    }
    catch(err){
        throw new Error("task not found!");
    }
}


  

const getTasksByProjectId = async (projectId) => {
    try {
       console.log("Projectid",projectId)
      const tasks = await Task.find({ projectId })
    //   populate('assignedTo', 'name email'); // Assuming you want to populate the assigned user info
  
      return tasks;
    } catch (err) {
      console.error("Error in getTasksByProjectId service:", err.message);
      throw new Error('Error retrieving tasks by project ID');
    }
  }

const taskUpdateByUser= async({taskId, status}) =>{ 
    try {
      console.log("id",taskId,status);
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { taskStatus: status },
        { new: true } 
      );
  
      if (!updatedTask) {
        throw new Error('Task not found');
      }
  
      return updatedTask; // Return the updated task
    } catch (error) {
      console.log("error",error)
      throw new Error('Error updating task status: ' + error.message);
    }
  }

  const taskUpdateByAdmin= async({taskId, taskData}) =>{ 
    try {
      console.log("id",taskId,taskData); 
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
       taskData,
        { new: true } 
      );
  
      if (!updatedTask) {
        throw new Error('Task not found');
      }
  
      return updatedTask; // Return the updated task
    } catch (error) {
      console.log("error",error)
      throw new Error('Error updating task status: ' + error.message);
    }
  }

const deleteTask = async (taskId) => {
    try{
    return Task.findByIdAndDelete(taskId);
}
catch(err){
   throw new Error("task not found!");
}
  };

  //update


  module.exports ={createTask,getTaskById,getAllTask,deleteTask,getTasksByProjectId,taskUpdateByUser,taskUpdateByAdmin};