
const { getUserIdFromToken } = require('../config/jwtProvder.js');
const projectService = require('../service/project.service.js');



const createProject = async (req, res) => {
  try {
      let projectData = req.body;
      projectData = {
        ...projectData,
        createdBy: req.userId,
      }
      // console.log("project data",projectData)
      const newProject = await projectService.createProject(projectData);
      return res.status(201).json(newProject);
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
}

  const getAllProjects = async (req, res) => {
  
    try { 
     
      const project = await projectService.getAllProjects(); 
      return res.status(200).json({ message: 'all project',project});  
    } catch (err) {
      return res.status(500).json({ message: err.message });
    } 
  }    

  const getProjectById = async (req, res) => {
    const {projectId} = req.params;
    console.log("hello",req.params)
    try {
     
      const project = await projectService.getProjectById(projectId);
      console.log("end")
      return res.status(200).json({ message: 'project by id',project});
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  const deleteProjectById = async (req, res) => {
    const {projectId} = req.params;
    console.log("hello",req.params)
    try {
     
      const project = await projectService.deleteProjectById(projectId);
      console.log("end")
      return res.status(200).json({ message: 'delete project by id',project});
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  const projectUpdateByAdmin = async (req, res) => {
    console.log("taskyupdatebyadmin")
    const  {projectId}  = req.params;   
    const taskData = req.body; 
     
     try {
  
         console.log("taskUpdateByUser",req.user,projectId,taskData)
        //  const userId = getUserIdFromToken()
       
         const updatedTask = await projectService.projectUpdateByAdmin({projectId, taskData});
     
         
         return res.status(200).json({message: 'project status updated successfully',task: updatedTask  });
       } catch (err) {
         
         return res.status(500).json({
           message: 'Failed to update task status',
           error: err.message 
         });
       } 
  } 

module.exports = { createProject,getAllProjects, getProjectById,deleteProjectById,projectUpdateByAdmin };
 