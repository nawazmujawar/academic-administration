const express = require('express');
const router = express.Router();

//Controllers
const teacherController = require('../controllers/teacher');
const activateCheck = require('../middlewares/activation');
//Middlwares
const authCheck = require('../middlewares/authCheck');

//Configs
const uploadFiles = require('../configs/fileUpload');


//Dashboard router
router.get('/dashboard', authCheck.redirectToSignInTeacher, activateCheck.isTeacherActivated, teacherController.dashboard);

//View single post
router.get('/dashboard/post/:postId', authCheck.redirectToSignInTeacher, teacherController.viewSinglePost);

//Remove post
router.get('/dashboard/post/:postId/remove', authCheck.redirectToSignInTeacher, activateCheck.isTeacherActivated, teacherController.removeSinglePost);

//New post
router.get('/dashboard/new', authCheck.redirectToSignInTeacher, activateCheck.isTeacherActivated, teacherController.getSinglePost);

//Create new post, notics, assignment
router.post('/dashboard/new', authCheck.redirectToSignInTeacher, activateCheck.isTeacherActivated, uploadFiles.fields([{ name: 'post', maxCount: 100 }, { name: 'attachment', maxCount: 2 }]), teacherController.postSinglePost);

//Sign out from session
router.get('/signout', authCheck.redirectToSignInTeacher, teacherController.getSignOut);

module.exports = router;