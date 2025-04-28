
const Project = require('../model/project.model.js');
const User = require('../model/user.model.js');


// const createProject = async ({projectTitle, projectDescription, assignedUser}) => {
//     try {
       
//             console.log("users createproject",assignedUser)
        

//         const newProject = new Project({ projectTitle,projectDescription,assignedUser});

//         const project = await newProject.save();
//         return project;
//     } catch (error) {
//         throw new Error("error in creating project"); 
//     }
// } 
const createProject = async (data) => {
    try {
              console.log("project data",data)
        
        const project = new Project(data);
        await project.save();
        return project;
    } catch (error) {
        throw new Error('Error creating project: ' + error.message);
    }
};

const getAllProjects = async () => {
    try {
        const projects = await Project.find().populate('assignedUser', 'name'); 
        return projects;

    } catch (error) {
        throw new Error("error in fetching projects");
    }
};


const getProjectById = async (projectId) => {
    try {
        const project = await Project.findById(projectId)
        .populate('assignedUser', 'name');
        if (!project) {
            throw new Error('Project not found!');
        }
        return project;
    } catch (error) {
        throw new Error("error in fetching projects");
    }
}

const deleteProjectById = async (projectId) => {
    try{
    return Project.findByIdAndDelete(projectId);
}
catch(err){
   throw new Error("project not found!");
}
  };


   const projectUpdateByAdmin= async({projectId, taskData}) =>{ 
      try {
        console.log("id",projectId,taskData); 
        const updatedProject = await Project.findByIdAndUpdate(
          projectId,
         taskData.projectData,
          { new: true } 
        );
    
        if (!updatedProject) {
          throw new Error('updatedProject not found');
        }
    
        return updatedProject;
      } catch (error) {
        console.log("error",error)
        throw new Error('Error updating updatedProject status: ' + error.message);
      }
    }
module.exports = { createProject, getAllProjects, getProjectById ,deleteProjectById,projectUpdateByAdmin};
