const express = require('express');
const { getUserByEmail, getUserById, getAllUser, deleteUser, getUserByToken, updateUserById, getUserByName } = require('../controller/user.controller');
const { adminAuthenticate } = require('../middleware/authentication');

const router = express.Router();


 router.get('/email/:email',getUserByEmail);

 router.get('/token',getUserByToken);
 router.get('/userId/:userId', getUserById);
 router.get('/getUserByName/:name', getUserByName);


router.get('/getAllUser', adminAuthenticate, getAllUser);

router.patch('/update/:userId',  updateUserById);
router.delete('/delete/:userId',  deleteUser);

module.exports = router;
