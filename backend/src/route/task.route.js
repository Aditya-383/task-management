const express = require('express');
const { createTask, getTaskById, getAllTasks, deleteTask, getTasksByProjectId, taskUpdateByUser, taskUpdateByAdmin } = require('../Controller/task.controller');
const { adminAuthenticate } = require('../middleware/authentication');
const router = express.Router();


router.post('/createTask', adminAuthenticate,createTask);

router.get('/taskId/:taskId',adminAuthenticate, getTaskById);
router.get('/getTask/:projectId',adminAuthenticate, getTasksByProjectId);

router.get('/allTask',  getAllTasks);
router.patch('/updateByUser/:taskId',  taskUpdateByUser)
router.patch('/updateByAdmin/:taskId', adminAuthenticate, taskUpdateByAdmin)

router.delete('/deleteTask/:taskId', adminAuthenticate,deleteTask);

module.exports = router;
  