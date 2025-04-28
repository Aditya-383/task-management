const express = require('express');
const { getAllProjects, createProject, getProjectById, deleteProjectById, projectUpdateByAdmin } = require('../Controller/project.controller');
const { adminAuthenticate } = require('../middleware/authentication');
const router = express.Router();


router.post('/createProject', adminAuthenticate, createProject);

router.get('/allProjects', adminAuthenticate,getAllProjects);

router.get('/projectId/:projectId',getProjectById);
router.delete('/delete/:projectId',adminAuthenticate,deleteProjectById);
router.patch('/projectUpdateByAdmin/:projectId',adminAuthenticate,projectUpdateByAdmin);

module.exports = router;
