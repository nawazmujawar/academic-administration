const express = require('express');
const router = express.Router();

//Middlewares
const authCheck = require('../middlewares/authCheck');

//Constrollers
const signInController = require('../controllers/signin');

//Signin Teacher Homepage
router.get('/teacher', authCheck.redirectToDashboardTeacher, signInController.getTeacherSignIn);

//Authentication process for teacher
router.post('/teacher', signInController.postTeacherSignIn);

//Signin Teacher Homepage
router.get('/student', authCheck.redirectToFeedStudent, signInController.getStudentSignIn);

//Authentication process for teacher
router.post('/student', signInController.postStudentSignIn);

//Signin Admin Homepage
router.get('/admin', authCheck.redirectToDashboardAdmin, signInController.getAdminSignIn);

router.post('/admin', signInController.postAdminSignIn);

module.exports = router;